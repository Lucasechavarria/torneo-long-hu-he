// app/api/competitors/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwzO9mVCwld76BngT5RhtxkueOn-Wo6eSwbVo7EyAy6FQrADx357iyqoMxxUFj52LcARw/exec';

// Caché en memoria para evitar saturar las cuotas de Google Apps Script
let memoryCache: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 segundos de caché fresco

function getFallbackData(): any[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'cached_competitors.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error leyendo cached_competitors.json:', e);
  }
  return [];
}

export async function GET() {
  const now = Date.now();

  // 1. Si el caché en memoria está fresco (< 60 segundos), devolver inmediatamente (respuesta instantánea en ~1ms)
  if (memoryCache && (now - lastFetchTime < CACHE_TTL_MS)) {
    return NextResponse.json(memoryCache, {
      headers: {
        'Cache-Control': 'public, s-maxage=45, stale-while-revalidate=90',
        'X-Cache-Status': 'HIT',
      },
    });
  }

  // 2. Intentar consultar Google Apps Script con timeout y redirect: follow
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch(SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      redirect: 'follow',
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        memoryCache = data;
        lastFetchTime = now;

        // Guardar copia local en background
        try {
          const filePath = path.join(process.cwd(), 'public', 'cached_competitors.json');
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch {}

        return NextResponse.json(data, {
          headers: {
            'Cache-Control': 'public, s-maxage=45, stale-while-revalidate=90',
            'X-Cache-Status': 'MISS',
          },
        });
      }
    } else {
      console.warn(`[API /competitors] Google Script respondió con código ${response.status}. Utilizando respaldo.`);
    }
  } catch (error) {
    console.warn('[API /competitors] Error o timeout al contactar Google Script:', (error as Error).message);
  }

  // 3. Fallback de alta disponibilidad: Si Google Script falló (error 500, límite de cuota o timeout):
  // Si tenemos caché previo en memoria, lo usamos
  if (memoryCache && memoryCache.length > 0) {
    return NextResponse.json(memoryCache, {
      headers: {
        'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=45',
        'X-Cache-Status': 'FALLBACK-MEMORY',
      },
    });
  }

  // Si no, cargamos los datos reales del archivo JSON de respaldo
  const fallback = getFallbackData();
  memoryCache = fallback;
  lastFetchTime = now;

  return NextResponse.json(fallback, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=45',
      'X-Cache-Status': 'FALLBACK-FILE',
    },
  });
}