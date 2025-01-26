import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server:{
        host:'192.168.1.3'
    }
  
    
})
