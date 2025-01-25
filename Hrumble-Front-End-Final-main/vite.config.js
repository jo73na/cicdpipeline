import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactSvgPlugin from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactSvgPlugin(),
  ],
  base: "/",
  build: {
    chunkSizeWarningLimit: 16000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries like React, React DOM, and Ant Design
          vendor: ['react', 'react-dom', 'antd'],
          // Separate libraries like jspdf and html2canvas
          pdfLibs: ['jspdf', 'html2canvas'],
          // Other dependencies that are frequently used
          utilities: ['lodash', 'moment'],
        },
      },
    },
  },
});
