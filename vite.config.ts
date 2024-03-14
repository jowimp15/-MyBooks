import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://jowimp15.github.io/mybooks.github.io",
  css: {
    preprocessorOptions: {
      sass: {
        // Puedes personalizar las opciones de Sass aquí
      },
    },
  },
});
