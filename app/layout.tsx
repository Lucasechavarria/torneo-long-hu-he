import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Work_Sans, Open_Sans, Yuji_Boku, Cinzel, Montserrat } from "next/font/google"
import localFont from "next/font/local"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "800", "900"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700", "800"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
})

const yujiBoku = Yuji_Boku({
  subsets: ["latin"],
  variable: "--font-yuji-boku",
  weight: "400",
})

const marshalTheDead = localFont({
  src: "../public/fonts/marshal-the-dead/Marshal The Dead.ttf",
  variable: "--font-marshal-the-dead",
})

const theUltraBrush = localFont({
  src: "../public/fonts/the-ultra-brush/Ultra Brush Demo.ttf",
  variable: "--font-the-ultra-brush",
})

export const metadata: Metadata = {
  title: "Torneo Abierto de Artes Marciales 2026 | Asociación Long Hu He",
  description:
    "Torneo Abierto de Artes Marciales 2026 - Asociación Long Hu He (Kung Fu Shaolin - Taijiquan Sur Argentina). Domingo 22 de Noviembre de 2026 en Club Alberdi de Burzaco. Formas, armas, point fighting, tai chi y más.",
  generator: "v0.app",
  icons: {
    icon: '/Logo-dorado.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${cinzel.variable} ${montserrat.variable} ${workSans.variable} ${openSans.variable} ${yujiBoku.variable} ${marshalTheDead.variable} ${theUltraBrush.variable}`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
