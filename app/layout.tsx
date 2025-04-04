import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GradientBackground } from "@/components/gradient-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SAVAYAS HEAL - Find Your Mental Health Professional in India",
  description:
    "Connect with psychiatrists, relationship counselors, and active listeners in India who can help you navigate life's challenges.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <GradientBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


