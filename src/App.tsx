import { GlassScene } from "@/components/glass-scene"

export function App() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
        <p className="text-xs tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
          Ottr
        </p>
      </div>

      <GlassScene />
    </div>
  )
}

export default App
