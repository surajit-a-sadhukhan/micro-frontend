import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  hostCounter: 0,
  remoteCounter: 0,
  status: 'Ready',
  lastSync: 'Never',
}

const microFrontendSlice = createSlice({
  name: 'microFrontends',
  initialState,
  reducers: {
    incrementHost(state) {
      state.hostCounter += 1
      state.status = 'Host updated'
      state.lastSync = new Date().toLocaleTimeString()
    },
    incrementRemote(state) {
      state.remoteCounter += 1
      state.status = 'Remote updated'
      state.lastSync = new Date().toLocaleTimeString()
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    syncSnapshot(state) {
      state.lastSync = new Date().toLocaleTimeString()
    },
  },
})

export const { incrementHost, incrementRemote, setStatus, syncSnapshot } =
  microFrontendSlice.actions

export const store = configureStore({
  reducer: {
    microFrontends: microFrontendSlice.reducer,
  },
})
