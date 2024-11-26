import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import scss from 'sass';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';
// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    build: {
        // the built files will be added here
        outDir: "./../public",
    },
    // also going to change base base on mode
    base: "/",
  plugins: [
      react(),
      svgr(),
  ],
    css: {
        preprocessorOptions: {
            scss: {
                implementation: scss,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'c8',
            enabled: true,
            reporter: ['text'],
        },
    },
})
