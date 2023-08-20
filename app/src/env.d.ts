/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_BD_PUBLIC_URL: string
  readonly VITE_DB_PUBLIC_KEY: string
  readonly VITE_STRIPE_PUBLIC_KEY: string
  readonly VITE_STRIPE_PRICE_ID: string
  readonly VITE_PUBLIC_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
