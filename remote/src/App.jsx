import { useDispatch, useSelector } from 'react-redux'
import RemoteWidget from './components/RemoteWidget.jsx'
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
        The remote app exposes its widget and keeps its own local Redux state.
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
