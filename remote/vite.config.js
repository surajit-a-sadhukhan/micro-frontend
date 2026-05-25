import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteWidget': './src/components/RemoteWidget.jsx',
      },
      shared: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux'],
    }),
  ],
  server: {
    port: 5174,
  },
})
