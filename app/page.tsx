'use client'

// Main Page Component
// This file defines the layout and structure of the NFT minting interface
import Image from "next/image"
import { Play, Github, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useRef } from "react"
import Script from 'next/script'

export default function Home() {
  // Audio state management
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://www.buzzsprout.com/2490108/episodes/17046293-test-pod.mp3')
    }
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    // Main container with background color
    <div className="flex min-h-screen bg-[#e8f4ff]">
      {/* Wallet Connection Button */}
      {/* Fixed position in top right corner */}
      <div className="fixed top-0 right-0 p-4 z-50">
        <ConnectButton />
      </div>

      {/* Side Panel */}
      {/* Contains logo, episode list, and social links */}
      <div className="w-[400px] border-r border-[#00a8ff]/20 bg-white text-[#001f3f] p-4 hidden md:block">
        {/* Logo Section */}
        <div className="flex flex-col items-start mb-6">
          <Image
            src="/1.png"
            alt="Logo"
            width={180}
            height={180}
            className="mb-4"
          />
        </div>

        {/* Buzzsprout Player */}
        <div className="max-w-[350px] mx-auto">
          <div id='buzzsprout-large-player'></div>
          <Script
            src='https://www.buzzsprout.com/2490108.js?container_id=buzzsprout-large-player&player=large'
            strategy="afterInteractive"
          />
        </div>

        {/* Social Links */}
        {/* Fixed position at bottom left of side panel */}
        <div className="absolute bottom-6 left-6 flex gap-4">
          <button
            className="flex items-center justify-center h-9 w-9 rounded-full border border-[#00a8ff]/20 bg-transparent text-[#001f3f] hover:bg-[#0077cc] hover:text-white hover:border-[#0077cc] transition-colors"
          >
            <span className="font-serif text-[22px] leading-none">𝕏</span>
            <span className="sr-only">Twitter</span>
          </button>
          <button
            className="flex items-center justify-center h-9 w-9 rounded-full border border-[#00a8ff]/20 bg-transparent text-[#001f3f] hover:bg-[#0077cc] hover:text-white hover:border-[#0077cc] transition-colors"
          >
            <Github className="w-[22px] h-[22px]" />
            <span className="sr-only">GitHub</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {/* Contains NFT preview and minting information */}
      <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-light tracking-widest text-[#001f3f] font-['MEK-Mono']">LIMITED EDITION</h1>
          </div>

          {/* NFT Preview */}
          <div className="border border-[#00a8ff]/30 rounded-lg overflow-hidden mb-8 w-full bg-white">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <Image
                src="/art.gif"
                alt="NFT Art Preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Minting Information */}
          <div className="space-y-6 max-w-md mx-auto">
            {/* Price Display */}
            {/* TODO: Connect to smart contract to get actual mint price
                 This should be replaced with a dynamic value from:
                 1. Smart contract's price() function
                 Example implementation:
                 const { data: price } = useContractRead({
                   address: CONTRACT_ADDRESS,
                   abi: NFT_ABI,
                   functionName: 'price',
                 })
                 Then format and display: `${ethers.utils.formatEther(price)} ETH`
            */}
            <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
              <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">Price</span>
              <span className="text-base font-['MEK-Mono'] text-[#001f3f]">0.01 ETH</span>
            </div>

            {/* Remaining Supply */}
            {/* TODO: Connect to smart contract to get actual remaining supply
                 This should be replaced with a dynamic value from:
                 1. Smart contract's totalSupply() function
                 2. Smart contract's maxSupply() function
                 Example implementation:
                 const { data: totalSupply } = useContractRead({
                   address: CONTRACT_ADDRESS,
                   abi: NFT_ABI,
                   functionName: 'totalSupply',
                 })
                 const { data: maxSupply } = useContractRead({
                   address: CONTRACT_ADDRESS,
                   abi: NFT_ABI,
                   functionName: 'maxSupply',
                 })
                 Then display: `${totalSupply} / ${maxSupply}`
            */}
            <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
              <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">Remaining</span>
              <span className="text-base font-['MEK-Mono'] text-[#001f3f]">20 / 20</span>
            </div>

            {/* Mint Button */}
            {/* TODO: Connect to smart contract for minting functionality
                 This should be implemented with:
                 1. Smart contract's mint() function
                 2. Proper error handling
                 3. Loading states
                 4. Transaction confirmation
                 Example implementation:
                 const { write: mint, isLoading } = useContractWrite({
                   address: CONTRACT_ADDRESS,
                   abi: NFT_ABI,
                   functionName: 'mint',
                   value: price, // Price from contract
                 })
                 
                 const handleMint = () => {
                   if (!isConnected) {
                     openConnectModal()
                     return
                   }
                   mint()
                 }
            */}
            <div className="flex justify-center">
              <button
                className="relative inline-flex items-center justify-center w-64 bg-[#e8f4ff] text-[#001f3f] rounded-lg h-14 font-['MEK-Mono'] text-lg tracking-widest border border-[#00a8ff]/20 transition-colors duration-200 hover:bg-[#0077cc] hover:text-white hover:border-[#0077cc]"
              >
                MINT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
