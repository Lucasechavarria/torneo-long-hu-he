// app/api/competitors/route.ts
import { NextResponse } from 'next/server';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwzO9mVCwld76BngT5RhtxkueOn-Wo6eSwbVo7EyAy6FQrADx357iyqoMxxUFj52LcARw/exec';

export async function GET() {
  try {
    const response = await fetch(SCRIPT_URL);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error desde Google Apps Script:', errorText);
      return NextResponse.json(
        { error: `Google Script error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validar que sea un array
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Invalid data format from Google Script' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error en /api/competitors:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}