"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"

import { Suspense } from "react"
// import "./globals.css"







export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <Analytics />
    </>
  )
}
