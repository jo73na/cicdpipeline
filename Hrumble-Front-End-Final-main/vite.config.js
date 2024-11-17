import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactSvgPlugin from "vite-plugin-react-svg";



// https://vitejs.dev/config/
export default defineConfig({

server:{
  host: true,
},

  plugins: [react(),reactSvgPlugin(),],
 


  base: "/",
  build: {
    chunkSizeWarningLimit: 16000,
   

  },
});
