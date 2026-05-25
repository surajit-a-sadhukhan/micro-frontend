import { useDispatch, useSelector } from 'react-redux'
import RemoteWidget from '../../shared/components/RemoteWidget.jsx'
import { incrementHost, incrementRemote } from './store.js'

function App() {
  const dispatch = useDispatch()
  const { hostCounter, remoteCounter, lastSync, status } = useSelector(
    (state) => state.microFrontends,
  )

  const handleHostIncrement = () => {
    dispatch(incrementHost())
  }

  const handleRemoteIncrement = () => {
    dispatch(incrementRemote())
  }

  return (
    <div className="remote-shell">
      <p className="eyebrow">Micro Frontend Remote</p>
      <h1>Redux-managed feature app</h1>
      <p className="subtitle">
        This app uses the same shared widget and shared Redux slice as the host.
      </p>

      <RemoteWidget
        hostCounter={hostCounter}
        remoteCounter={remoteCounter}
        status={status}
        lastSync={lastSync}
        onHostIncrement={handleHostIncrement}
        onRemoteIncrement={handleRemoteIncrement}
      />
    </div>
  )
}

export default App
