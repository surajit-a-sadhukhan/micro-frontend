import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        remote: {
          type: 'module',
          name: 'remote',
          entry: 'http://localhost:5174/remoteEntry.js',
          entryGlobalName: 'remote',
          shareScope: 'default',
        },
      },
      shared: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux'],
    }),
  ],
  server: {
    port: 5173,
  },
})
