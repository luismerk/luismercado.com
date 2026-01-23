import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  root: "app/javascript",
  plugins: [RubyPlugin()],
  server: {
    host: 'localhost',
    port: 3036,       // matches the port your bin/dev logs
    hmr: {
      host: 'localhost',
      protocol: 'ws',  // usually ws for WebSocket
      port: 3036
    }
  }
})
