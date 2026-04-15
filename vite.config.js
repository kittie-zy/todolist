import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
// ESM 환경에서 __dirname 객체를 생성하기 위한 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/todolist/",
});
