import { lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementHost, incrementRemote } from './store.js'

const RemoteWidget = lazy(() => import('remote/RemoteWidget'))

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
          The host now renders the remote widget through a federated runtime import.
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
          <span>Federated remote widget</span>
          <span>{status}</span>
        </div>

        <Suspense fallback={<div>Loading remote widget…</div>}>
          <RemoteWidget
            hostCounter={hostCounter}
            remoteCounter={remoteCounter}
            status={status}
            lastSync={lastSync}
            onHostIncrement={handleHostIncrement}
            onRemoteIncrement={handleRemoteIncrement}
          />
        </Suspense>
      </section>
    </div>
  )
}

export default App
