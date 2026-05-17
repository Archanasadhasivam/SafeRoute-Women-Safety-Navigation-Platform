import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/SafeRoute-Women-Safety-Navigation-Platform/', // 👈 MATCH THIS REPO NAME EXACTLY
})