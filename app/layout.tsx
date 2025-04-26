// Root Layout Component
// This file sets up the base layout and providers for the entire application
import type React from "react"
import "@/app/globals.css"
import '@rainbow-me/rainbowkit/styles.css';
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Web3Provider } from "@/providers/web3-provider"

// Initialize Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] })

// Metadata for the application
export const metadata = {
  title: "Limited Edition NFT Mint",
  description: "Exclusive NFT collection - only 20 available",
  generator: 'v0.dev'
}

// Root layout component that wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Theme Provider for dark/light mode support */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Web3 Provider for blockchain functionality */}
          <Web3Provider>
            {children}
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
