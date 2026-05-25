import { configureStore } from '@reduxjs/toolkit'
import { microFrontendSlice } from './microFrontendSlice.js'

export const createMicroFrontendStore = () =>
  configureStore({
    reducer: {
      microFrontends: microFrontendSlice.reducer,
    },
  })
