import Image from "next/image"
import { Play, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#e8f4ff]">
      {/* Top Navigation */}
      <div className="fixed top-0 right-0 p-4 z-50">
        <ConnectButton />
      </div>

      {/* Side Panel */}
      <div className="w-64 border-r border-[#00a8ff]/20 bg-white text-[#001f3f] p-6 hidden md:block">
        <div className="flex justify-start mb-10 gap-4">
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

        <div className="space-y-2">
          <button className="w-full">
            <div className="flex items-center justify-between border border-[#001f3f]/20 rounded-lg px-3 py-1 bg-transparent hover:bg-[#00a8ff]/5 hover:border-[#00a8ff] transition-all duration-200 w-full">
              <span className="text-sm font-light tracking-wider">Episode I</span>
              <div
                className="flex items-center justify-center h-8 w-8 rounded-full bg-transparent text-[#001f3f] group-hover:bg-[#00a8ff] group-hover:text-white transition-all duration-200"
              >
                <Play className="h-4 w-4" />
                <span className="sr-only">Play Episode I</span>
              </div>
            </div>
          </button>

          <button className="w-full">
            <div className="flex items-center justify-between border border-[#001f3f]/20 rounded-lg px-3 py-1 bg-transparent hover:bg-[#00a8ff]/5 hover:border-[#00a8ff] transition-all duration-200 w-full">
              <span className="text-sm font-light tracking-wider">Episode II</span>
              <div
                className="flex items-center justify-center h-8 w-8 rounded-full bg-transparent text-[#001f3f] group-hover:bg-[#00a8ff] group-hover:text-white transition-all duration-200"
              >
                <Play className="h-4 w-4" />
                <span className="sr-only">Play Episode II</span>
              </div>
            </div>
          </button>

          <button className="w-full">
            <div className="flex items-center justify-between border border-[#001f3f]/20 rounded-lg px-3 py-1 bg-transparent hover:bg-[#00a8ff]/5 hover:border-[#00a8ff] transition-all duration-200 w-full">
              <span className="text-sm font-light tracking-wider">Episode III</span>
              <div
                className="flex items-center justify-center h-8 w-8 rounded-full bg-transparent text-[#001f3f] group-hover:bg-[#00a8ff] group-hover:text-white transition-all duration-200"
              >
                <Play className="h-4 w-4" />
                <span className="sr-only">Play Episode III</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="fixed bottom-0 left-0 right-0 bg-white text-[#001f3f] p-4 flex justify-around md:hidden border-t border-[#00a8ff]/20 z-10">
        <div className="flex flex-col items-center">
          <span className="text-xs font-light">I</span>
          <button
            className="flex items-center justify-center !h-8 !w-8 rounded-full bg-transparent text-[#001f3f] hover:bg-[#00a8ff] hover:text-white transition-colors"
          >
            <Play className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-light">II</span>
          <button
            className="flex items-center justify-center !h-8 !w-8 rounded-full bg-transparent text-[#001f3f] hover:bg-[#00a8ff] hover:text-white transition-colors"
          >
            <Play className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-light">III</span>
          <button
            className="flex items-center justify-center !h-8 !w-8 rounded-full bg-transparent text-[#001f3f] hover:bg-[#00a8ff] hover:text-white transition-colors"
          >
            <Play className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-4">
            <button
              className="flex items-center justify-center h-9 w-9 rounded-full border border-[#00a8ff]/20 bg-transparent text-[#001f3f] hover:bg-[#0077cc] hover:text-white hover:border-[#0077cc] transition-colors"
            >
              <span className="font-serif text-[22px] leading-none">𝕏</span>
            </button>
            <button
              className="flex items-center justify-center h-9 w-9 rounded-full border border-[#00a8ff]/20 bg-transparent text-[#001f3f] hover:bg-[#0077cc] hover:text-white hover:border-[#0077cc] transition-colors"
            >
              <Github className="w-[22px] h-[22px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-light tracking-widest text-[#001f3f] font-['MEK-Mono']">LIMITED EDITION</h1>
          </div>

          <div className="border border-[#00a8ff]/30 rounded-lg overflow-hidden mb-8 aspect-[16/9] w-full bg-white">
            <Image
              src="/art.gif"
              alt="NFT Art Preview"
              width={600}
              height={338}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
              <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">Price</span>
              <span className="text-base font-['MEK-Mono'] text-[#001f3f]">0.01 ETH</span>
            </div>

            <div className="flex justify-between items-center border-b border-[#00a8ff]/30 pb-3">
              <span className="text-base font-['MEK-Mono'] text-[#001f3f]/80">Remaining</span>
              <span className="text-base font-['MEK-Mono'] text-[#001f3f]">20 / 20</span>
            </div>

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
