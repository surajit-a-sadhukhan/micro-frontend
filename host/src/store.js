import { createMicroFrontendStore } from '../../shared/store/createMicroFrontendStore.js'
import {
  incrementHost,
  incrementRemote,
  setStatus,
  syncSnapshot,
} from '../../shared/store/microFrontendSlice.js'

export const store = createMicroFrontendStore()

export { incrementHost, incrementRemote, setStatus, syncSnapshot }
