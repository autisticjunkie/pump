"'use client'"

import Link from "next/link"
import { useRouter } from "'next/navigation'"
import { Home } from "'lucide-react'"

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const refreshHome = () => {
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full bg-black border-b border-gray-800 z-40">
        <nav className="flex justify-between items-center px-4 py-2">
          <div className="w-1/3 flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5909135157275773675.jpg-wltKvwoMRTiuTJEa6df1AGqlCOqKlL.jpeg"
              alt="PumpTok"
              className="w-8 h-8 object-contain mr-2"
            />
            <span className="text-lg font-bold">PumpTok</span>
          </div>
          <div className="w-1/3 flex justify-center">
            <span className="font-semibold">For You</span>
          </div>
          <div className="w-1/3"></div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-16">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-black border-t border-gray-800 z-40">
        <div className="flex justify-around items-center py-2">
          <button onClick={refreshHome} className="flex flex-col items-center p-2">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <Link href="./discover" className="flex flex-col items-center p-2">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OIP.jpg-YHTNg1h1BlTa43qeKxZTMYR8tjZblQ.jpeg" alt="Discover" className="w-6 h-6 object-contain invert" />
            <span className="text-xs mt-1">Dexscreener</span>
          </Link>
          <Link href="./create" className="flex flex-col items-center p-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5909135157275773675.jpg-wltKvwoMRTiuTJEa6df1AGqlCOqKlL.jpeg"
              alt="Create"
              className="w-6 h-6 object-contain"
            />
            <span className="text-xs mt-1">Pumpfun</span>
          </Link>
          <Link href="./inbox" className="flex flex-col items-center p-2">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-telegram-50-zFukt6hjJrFb7oNXPFLx1EWcInecUV.png" alt="Inbox" className="w-6 h-6 object-contain invert" />
            <span className="text-xs mt-1">Telegram</span>
          </Link>
          <Link href="./profile" className="flex flex-col items-center p-2">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icons8-twitterx-50-B3XaVJhehUt7naC9s9BZBNn7QZrSHR.png" alt="Profile" className="w-6 h-6 object-contain invert" />
            <span className="text-xs mt-1">X</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

