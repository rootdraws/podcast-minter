import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#f8f5e6]">
      {/* Side Panel */}
      <div className="w-64 border-r border-[#333333]/20 bg-black text-white p-6 hidden md:block">
        <div className="flex justify-end mb-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-transparent hover:bg-[#333333]/20 text-[#f8f5e6]"
          >
            <span className="font-serif text-lg">𝕏</span>
            <span className="sr-only">Twitter</span>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="group">
            <div className="flex items-center justify-between border-b border-[#333333]/30 pb-2">
              <span className="text-sm font-light tracking-wider">Episode I</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-transparent hover:bg-[#333333]/20 text-[#f8f5e6]"
              >
                <Play className="h-4 w-4" />
                <span className="sr-only">Play Episode I</span>
              </Button>
            </div>
          </div>

          <div className="group">
            <div className="flex items-center justify-between border-b border-[#333333]/30 pb-2">
              <span className="text-sm font-light tracking-wider">Episode II</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-transparent hover:bg-[#333333]/20 text-[#f8f5e6]"
              >
                <Play className="h-4 w-4" />
                <span className="sr-only">Play Episode II</span>
              </Button>
            </div>
          </div>

          <div className="group">
            <div className="flex items-center justify-between border-b border-[#333333]/30 pb-2">
              <span className="text-sm font-light tracking-wider">Episode III</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-transparent hover:bg-[#333333]/20 text-[#f8f5e6]"
              >
                <Play className="h-4 w-4" />
                <span className="sr-only">Play Episode III</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-around md:hidden border-t border-[#333333]/20 z-10">
        <div className="flex flex-col items-center">
          <span className="text-xs font-light">I</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-transparent hover:bg-[#333333]/20 text-[#f8f5e6]"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-light">II</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-transparent hover:bg-[#333333]/20 text-[#f8f5e6]"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-light">III</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-transparent hover:bg-[#333333]/20 text-[#f8f5e6]"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-transparent hover:bg-[#333333]/20 text-[#f8f5e6]"
          >
            <span className="font-serif text-lg">𝕏</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-light tracking-widest text-black">LIMITED EDITION</h1>
          </div>

          <div className="border border-[#333333]/30 rounded-lg overflow-hidden mb-8 aspect-[16/9] w-full">
            <Image
              src="/placeholder.svg?height=338&width=600"
              alt="NFT Preview"
              width={600}
              height={338}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <div className="flex justify-between items-center border-b border-[#333333]/30 pb-3">
              <span className="text-sm font-light text-black/80">Price</span>
              <span className="text-sm font-medium text-black">0.01 ETH</span>
            </div>

            <div className="flex justify-between items-center border-b border-[#333333]/30 pb-3">
              <span className="text-sm font-light text-black/80">Remaining</span>
              <span className="text-sm font-medium text-black">20 / 20</span>
            </div>

            <Button className="w-full bg-black hover:bg-black/90 text-white rounded-none h-12 font-light tracking-widest border border-[#333333]/50">
              MINT
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
