import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
//   server:{
//   port:8888
// }
  server: {
    host: true, // or '0.0.0.0' to allow connections from network
    port: 8888  // optional: to fix the port
  },
    
})

