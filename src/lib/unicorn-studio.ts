export type UnicornStudioScene = {
  destroy?: () => void
  element?: HTMLElement
}

export type UnicornStudioAPI = {
  init: (config?: {
    scale?: number
    dpi?: number
  }) => Promise<UnicornStudioScene[]>
  destroy?: () => void
}

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioAPI
  }
}

const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.7/dist/unicornStudio.umd.js"
const SCRIPT_ATTR = "data-unicorn-studio-sdk"

let loadPromise: Promise<UnicornStudioAPI> | null = null

function loadUnicornStudioScript(): Promise<UnicornStudioAPI> {
  if (window.UnicornStudio) {
    return Promise.resolve(window.UnicornStudio)
  }

  if (loadPromise) {
    return loadPromise
  }

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[${SCRIPT_ATTR}]`
    )

    if (existing) {
      if (window.UnicornStudio) {
        resolve(window.UnicornStudio)
        return
      }
      existing.addEventListener("load", () => {
        if (window.UnicornStudio) {
          resolve(window.UnicornStudio)
        } else {
          reject(new Error("UnicornStudio failed to initialize"))
        }
      })
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load UnicornStudio script"))
      )
      return
    }

    const script = document.createElement("script")
    script.src = SDK_URL
    script.async = true
    script.setAttribute(SCRIPT_ATTR, "true")
    script.onload = () => {
      if (window.UnicornStudio) {
        resolve(window.UnicornStudio)
      } else {
        reject(new Error("UnicornStudio failed to initialize"))
      }
    }
    script.onerror = () =>
      reject(new Error("Failed to load UnicornStudio script"))
    document.body.appendChild(script)
  })

  return loadPromise
}

export async function initUnicornStudio(): Promise<UnicornStudioScene[]> {
  const UnicornStudio = await loadUnicornStudioScript()
  return UnicornStudio.init()
}

export function destroyUnicornStudioScenes(
  scenes: UnicornStudioScene[] | null
): void {
  if (!scenes) return
  for (const scene of scenes) {
    scene.destroy?.()
  }
}
