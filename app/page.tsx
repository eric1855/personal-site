'use client'
import dynamic from 'next/dynamic'

const WorldCanvas = dynamic(() => import('@/components/WorldCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black text-white font-mono text-sm tracking-widest uppercase">
      Loading world...
    </div>
  ),
})

export default function HomePage() {
  return (
    <main className="w-full h-full">
      <WorldCanvas />
    </main>
  )
}
