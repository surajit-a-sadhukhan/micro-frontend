import { createElement } from 'react'

function RemoteWidget({
  hostCounter,
  remoteCounter,
  status,
  lastSync,
  onHostIncrement,
  onRemoteIncrement,
}) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '20px',
    background: 'rgba(15, 23, 42, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#f8fafc',
  }

  const eyebrowStyle = {
    margin: 0,
    color: '#93c5fd',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  }

  const descriptionStyle = {
    margin: 0,
    color: '#cbd5e1',
  }

  const statCardStyle = {
    borderRadius: '16px',
    padding: '1rem',
    background: 'rgba(59, 130, 246, 0.18)',
  }

  const buttonRowStyle = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  }

  const badgeStyle = {
    padding: '0.55rem 0.8rem',
    borderRadius: '999px',
    background: 'rgba(34, 197, 94, 0.18)',
    color: '#86efac',
  }

  return createElement(
    'div',
    { style: containerStyle },
    createElement(
      'div',
      null,
      createElement('p', { style: eyebrowStyle }, 'Shared remote widget'),
      createElement('h2', { style: { margin: '0.5rem 0 0.2rem' } }, 'Reusable shared component'),
      createElement(
        'p',
        { style: descriptionStyle },
        'This component is shared between the host and remote apps.',
      ),
    ),
    createElement(
      'div',
      { style: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' } },
      createElement(
        'div',
        { style: statCardStyle },
        createElement('div', { style: { fontSize: '1.8rem', fontWeight: 700 } }, hostCounter),
        createElement('div', null, 'Host count'),
      ),
      createElement(
        'div',
        { style: statCardStyle },
        createElement('div', { style: { fontSize: '1.8rem', fontWeight: 700 } }, remoteCounter),
        createElement('div', null, 'Remote count'),
      ),
    ),
    createElement(
      'div',
      { style: buttonRowStyle },
      createElement(
        'button',
        { type: 'button', onClick: onHostIncrement },
        'Increment host',
      ),
      createElement(
        'button',
        { type: 'button', onClick: onRemoteIncrement },
        'Increment remote',
      ),
      createElement('span', { style: badgeStyle }, status),
    ),
    createElement('div', { style: { color: '#cbd5e1' } }, `Last sync: ${lastSync}`),
  )
}

export default RemoteWidget
