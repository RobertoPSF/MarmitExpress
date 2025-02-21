import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    watch: {
      usePolling: true, // Faz o Vite detectar mudanças em sistemas de arquivos montados
    },
    host: true, // Permite acessar via IP dentro da rede do Docker
    strictPort: true,
    port: 3000,
  }
});
