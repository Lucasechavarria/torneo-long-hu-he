'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Página no encontrada</h2>
      <p className="text-lg text-muted-foreground mb-8">Lo sentimos, no pudimos encontrar la página que buscas.</p>
      <Link href="/" className="text-primary hover:underline">
        Volver a la página de inicio
      </Link>
    </div>
  );
}
