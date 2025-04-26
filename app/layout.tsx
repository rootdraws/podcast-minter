import type React from "react"
import "@/app/globals.css"
import '@rainbow-me/rainbowkit/styles.css';
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Web3Provider } from "@/providers/web3-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Limited Edition NFT Mint",
  description: "Exclusive NFT collection - only 20 available",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Web3Provider>
            {children}
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
