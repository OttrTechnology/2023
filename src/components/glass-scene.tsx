import { useEffect, useRef } from "react"

import {
  destroyUnicornStudioScenes,
  initUnicornStudio,
  type UnicornStudioScene,
} from "@/lib/unicorn-studio"

export function GlassScene() {
  const itemRef = useRef<HTMLDivElement>(null)
  const scenesRef = useRef<UnicornStudioScene[] | null>(null)

  useEffect(() => {
    let cancelled = false

    // Defer init so React Strict Mode's mount→unmount→remount cycle
    // cancels the first attempt before UnicornStudio marks the node initialized.
    const timeoutId = window.setTimeout(() => {
      initUnicornStudio()
        .then((scenes) => {
          if (cancelled) {
            destroyUnicornStudioScenes(scenes)
            itemRef.current?.removeAttribute("data-us-initialized")
            return
          }
          scenesRef.current = scenes
        })
        .catch((err) => {
          if (!cancelled) {
            console.error(err)
          }
        })
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      destroyUnicornStudioScenes(scenesRef.current)
      scenesRef.current = null
      itemRef.current?.removeAttribute("data-us-initialized")
    }
  }, [])

  return (
    <div className="glass-stage">
      <div
        ref={itemRef}
        className="glass-stage__canvas"
        data-us-alttext="Ottr logo"
        data-us-project-src="/ottr-glass.json"
        data-us-scale="1"
        data-us-dpi="1"
        data-us-lazyload="false"
        data-us-production="true"
      />
    </div>
  )
}
