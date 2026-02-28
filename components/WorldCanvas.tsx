'use client'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

export default function WorldCanvas() {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 12, 9], fov: 50 }}
        shadows
        style={{ width: '100%', height: '100vh' }}
      >
        <Scene />
      </Canvas>

      {/* Controls hint overlay */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        <div className="flex gap-1">
          <Key label="W" />
        </div>
        <div className="flex gap-1">
          <Key label="A" />
          <Key label="S" />
          <Key label="D" />
        </div>
        <p className="text-white/60 text-xs mt-1 tracking-widest uppercase font-mono">
          or Arrow Keys to drive
        </p>
      </div>
    </div>
  )
}

function Key({ label }: { label: string }) {
  return (
    <div className="w-9 h-9 rounded bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white font-mono font-bold text-sm shadow-lg">
      {label}
    </div>
  )
}
