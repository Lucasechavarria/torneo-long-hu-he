import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Work_Sans, Open_Sans, Yuji_Boku } from "next/font/google"
import localFont from "next/font/local"

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

export const metadata: Metadata = {
  title: "Torneo Abierto de Artes Marciales 2025 | Asociacion Long Hu He",
  description:
    "Inscríbete al Torneo Abierto de Artes Marciales 2025. Formas tradicionales, combate, armas y más. 23 de noviembre en Burzaco.",
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
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${workSans.variable} ${openSans.variable} ${yujiBoku.variable} ${marshalTheDead.variable}`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
