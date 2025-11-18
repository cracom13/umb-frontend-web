import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/umb-frontend-web/",  // <--- aquí pones el nombre de tu repo
});
