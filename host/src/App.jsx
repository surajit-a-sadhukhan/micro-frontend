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
    <div className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Micro Frontend Host</p>
        <h1>Redux-powered shell</h1>
        <p className="subtitle">
          The host now renders a shared widget component from a common layer.
        </p>
        <div className="stats-grid">
          <article>
            <div className="stat-value">{hostCounter}</div>
            <p>Host count</p>
          </article>
          <article>
            <div className="stat-value">{remoteCounter}</div>
            <p>Remote count</p>
          </article>
        </div>
        <div className="actions">
          <button type="button" onClick={handleHostIncrement}>
            Increment host
          </button>
          <span className="badge">{status}</span>
        </div>
        <p className="meta">Last sync: {lastSync}</p>
      </section>

      <section className="frame-panel">
        <div className="frame-header">
          <span>Shared remote widget</span>
          <span>{status}</span>
        </div>

        <RemoteWidget
          hostCounter={hostCounter}
          remoteCounter={remoteCounter}
          status={status}
          lastSync={lastSync}
          onHostIncrement={handleHostIncrement}
          onRemoteIncrement={handleRemoteIncrement}
        />
      </section>
    </div>
  )
}

export default App
