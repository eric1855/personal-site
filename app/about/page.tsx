import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <p className="text-white/60 max-w-md text-center">Coming soon. Drive back to explore more.</p>
      <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors underline underline-offset-4">
        ← Back to world
      </Link>
    </main>
  )
}
