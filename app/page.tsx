'use client'

// Main Page Component
// This file defines the layout and structure of the NFT minting interface
import Image from "next/image"
import { Play, Github, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useRef, useEffect } from "react"
import Script from 'next/script'
import { useBlockNumber, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'

export default function Home() {
  // Audio state management
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [blocksRemaining, setBlocksRemaining] = useState(43200)
  const [isStarted, setIsStarted] = useState(false)
  
  // Get current block number
  const { data: currentBlock } = useBlockNumber({
    watch: true,
    chainId: 42161 // Arbitrum One
  })

  // Get contract's start block
  const { data: startBlock } = useContractRead({
    address: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with your contract address
    abi: [
      {
        "inputs": [],
        "name": "startBlock",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "start",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: 'startBlock',
  })

  // Start the countdown
  const { write: startMint, isLoading: isStarting } = useContractWrite({
    address: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with your contract address
    abi: [
      {
        "inputs": [],
        "name": "start",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: 'start',
  })

  useEffect(() => {
    if (currentBlock && startBlock) {
      const totalBlocks = 43200
      const blocksPassed = Number(currentBlock) - Number(startBlock)
      const remaining = Math.max(0, totalBlocks - blocksPassed)
      setBlocksRemaining(remaining)
      setIsStarted(blocksPassed > 0)
    }
  }, [currentBlock, startBlock])

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
            src="/AlphaGrowth.png"
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
          <a
            href="https://x.com/alphagrowth1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-9 w-9 rounded-full border border-[#00a8ff]/20 bg-transparent text-[#001f3f] hover:bg-[#0077cc] hover:text-white hover:border-[#0077cc] transition-colors"
          >
            <span className="font-serif text-[22px] leading-none">𝕏</span>
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://github.com/rootdraws/podcast-minter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-9 w-9 rounded-full border border-[#00a8ff]/20 bg-transparent text-[#001f3f] hover:bg-[#0077cc] hover:text-white hover:border-[#0077cc] transition-colors"
          >
            <Github className="w-[22px] h-[22px]" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      {/* Contains NFT preview and minting information */}
      <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-light tracking-widest text-[#001f3f] font-['MEK-Mono']">24 HR OPEN EDITION</h1>
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

          {/* Info Container */}
          <div className="w-full flex mb-8">
            {/* Left Section - MEK Info */}
            <div className="w-2/3 pr-4">
              <div className="border border-[#00a8ff]/30 rounded-lg p-4 flex items-center gap-4">
                <a href="https://x.com/michaelmicasso" target="_blank" rel="noopener noreferrer" className="border border-[#00a8ff]/30 rounded-lg overflow-hidden hover:border-[#0077cc] transition-colors">
                  <Image
                    src="/MEK Icon.jpg"
                    alt="MEK Icon"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </a>
                <div className="font-['MEK-Mono'] text-[#001f3f] space-y-2">
                  <p>Just for fun, we asked <a href="https://x.com/michaelmicasso" target="_blank" rel="noopener noreferrer" className="text-[#0077cc] hover:underline">MEK.txt</a> for his take on the Arbitrum Logo.</p>
                  <p>100% of sales go directly to MEK's wallet.</p>
                </div>
              </div>
            </div>

            {/* Right Section - Price and Supply */}
            <div className="w-1/3 pl-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">PRICE</span>
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]">0.01 ETH</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">TIME REMAINING</span>
                  {isStarted ? (
                    <span className="text-base font-['MEK-Mono'] text-[#001f3f]">{blocksRemaining.toLocaleString()} BLOCKS</span>
                  ) : (
                    <button
                      onClick={() => startMint?.()}
                      disabled={isStarting}
                      className="text-base font-['MEK-Mono'] text-[#0077cc] hover:underline disabled:opacity-50"
                    >
                      {isStarting ? 'STARTING...' : 'START MINT'}
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">TOTAL MINTED</span>
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mint Button */}
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
  )
}
