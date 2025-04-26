'use client'

// Main Page
import Image from "next/image"
import { Github } from "lucide-react"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useRef, useEffect } from "react"
import Script from 'next/script'
import { useReadContract, useWriteContract } from 'wagmi'
import { CONTRACT_ADDRESS, TOKEN_URI } from '@/config/contract';

// Contract ABI
const abi = [
  {
    "inputs": [],
    "name": "saleStart",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "saleEnd",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "tokenURI", "type": "string" }],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "start",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PRICE",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function Home() {
  // Audio state management
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sale window state
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  // Fetch saleStart and saleEnd
  const { data: saleStart } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'saleStart',
  })
  const { data: saleEnd } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'saleEnd',
  })

  // Fetch currentSupply
  const { data: currentSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'currentSupply',
  })

  // Fetch price from contract
  const { data: price } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'PRICE',
  })

  // Start the sale
  const { writeContract: startMint, isPending: isStarting } = useWriteContract();

  // Mint NFT
  const { writeContract: mint, isPending: isMinting } = useWriteContract();

  // Countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (saleStart && saleEnd) {
      const update = () => {
        const now = Math.floor(Date.now() / 1000)
        const remaining = Math.max(0, Number(saleEnd) - now)
        setTimeRemaining(remaining)
        setIsStarted(Number(saleStart) > 0 && now >= Number(saleStart) && now <= Number(saleEnd))
      }
      update()
      interval = setInterval(update, 1000)
    }
    return () => interval && clearInterval(interval)
  }, [saleStart, saleEnd])

  // Format seconds to HH:MM:SS
  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

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
          <iframe
            src="https://www.buzzsprout.com/2490108?client_source=large_player&iframe=true"
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            title="Alpha Growth Podcast"
            className="rounded-lg"
          ></iframe>
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
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]">{price ? `${Number(price) / 1e18} ETH` : '...'}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">TIME REMAINING</span>
                  {saleStart === undefined ? (
                    <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">Sale Not Started.</span>
                  ) : Number(saleStart) === 0 ? (
                    <button
                      onClick={() => startMint({
                        address: CONTRACT_ADDRESS,
                        abi,
                        functionName: 'start',
                      })}
                      disabled={isStarting}
                      className="text-base font-['MEK-Mono'] text-[#0077cc] hover:underline disabled:opacity-50"
                    >
                      {isStarting ? 'STARTING...' : 'START MINT'}
                    </button>
                  ) : (
                    <span className="text-base font-['MEK-Mono'] text-[#001f3f]">
                      {timeRemaining > 0 ? formatTime(timeRemaining) : 'Sale Ended'}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">TOTAL MINTED</span>
                  <span className="text-base font-['MEK-Mono'] text-[#001f3f]">{currentSupply?.toString() || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mint Button */}
          <div className="flex justify-center">
            <button
              onClick={() => mint({
                address: CONTRACT_ADDRESS,
                abi,
                functionName: 'mint',
                args: [TOKEN_URI],
                value: typeof price === 'bigint' ? price : (typeof price === 'string' || typeof price === 'number') ? BigInt(price) : undefined,
              })}
              disabled={!isStarted || isMinting || timeRemaining === 0}
              className="relative inline-flex items-center justify-center w-64 bg-[#e8f4ff] text-[#001f3f] rounded-lg h-14 font-['MEK-Mono'] text-lg tracking-widest border border-[#00a8ff]/30 border border-solid transition-colors duration-200 hover:bg-[#0077cc] hover:text-white hover:border-[#0077cc]"
            >
              {isMinting ? 'Minting...' : 'MINT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
