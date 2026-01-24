import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react-swc'
import Rails from 'vite-plugin-rails'

export default defineConfig({
  root: 'app/javascript',
  plugins: [
    Rails({
      fullReload: {
        additionalPaths: ['config/routes.rb', 'app/views/**/*'],
        delay: 200,
      },
    }),
    React(),
  ],
  server: {
    host: 'localhost',
    port: 3036,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3036
    }
  },
  build: {
    outDir: '../../public/vite',
    emptyOutDir: true
  }
})
