/// <reference types="vite/client" />

import type { UnicornStudioAPI } from "./lib/unicorn-studio"

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioAPI
  }
}

export {}
