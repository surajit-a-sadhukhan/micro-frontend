import { createSlice } from '@reduxjs/toolkit'

export const initialMicroFrontendState = {
  hostCounter: 0,
  remoteCounter: 0,
  lastSync: 'boot',
  status: 'Waiting for sync',
}

export const microFrontendSlice = createSlice({
  name: 'microFrontends',
  initialState: initialMicroFrontendState,
  reducers: {
    incrementHost: (state) => {
      state.hostCounter += 1
      state.lastSync = 'host'
      state.status = 'Host counter updated'
    },
    incrementRemote: (state) => {
      state.remoteCounter += 1
      state.lastSync = 'remote'
      state.status = 'Remote counter updated'
    },
    syncSnapshot: (state, action) => {
      const next = action.payload
      state.hostCounter = next.hostCounter
      state.remoteCounter = next.remoteCounter
      state.lastSync = next.lastSync
      state.status = next.status
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const { incrementHost, incrementRemote, syncSnapshot, setStatus } =
  microFrontendSlice.actions

export const selectMicroFrontendState = (state) => state.microFrontends
