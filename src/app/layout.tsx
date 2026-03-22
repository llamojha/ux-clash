import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uxclash.com"

export const metadata: Metadata = {
  title: {
    default: "UX Clash — La arena competitiva de UX/UI en código",
    template: "%s | UX Clash",
  },
  description:
    "Diseña interfaces con HTML + Tailwind para retos reales, compite en un leaderboard con scoring de IA y validación social.",
  keywords: ["UX", "UI", "diseño", "competición", "HTML", "Tailwind", "frontend"],
  authors: [{ name: "UX Clash" }],
  creator: "UX Clash",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "UX Clash",
    title: "UX Clash — La arena competitiva de UX/UI en código",
    description:
      "Diseña interfaces con HTML + Tailwind para retos reales, compite en un leaderboard con scoring de IA y validación social.",
  },
  twitter: {
    card: "summary_large_image",
    title: "UX Clash — La arena competitiva de UX/UI en código",
    description:
      "Diseña interfaces con HTML + Tailwind para retos reales, compite en un leaderboard con scoring de IA y validación social.",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  )
}
