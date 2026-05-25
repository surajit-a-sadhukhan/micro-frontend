# React Micro Frontend POC

This repository contains a two-app React micro frontend setup built with Vite, Redux Toolkit, and module federation.

## What is inside

### Host app
- Runs on port `5173`
- Acts as the shell application
- Uses a local Redux Toolkit store for shell state
- Lazily loads the remote widget at runtime through `import('remote/RemoteWidget')`
- Renders the remote UI inside a `Suspense` boundary

### Remote app
- Runs on port `5174`
- Exposes the `RemoteWidget` component through module federation
- Keeps its own local Redux Toolkit store for standalone behavior
- Provides the federated component used by the host

## How the micro frontend works

1. The remote app builds a `remoteEntry.js` bundle and exposes `./RemoteWidget`.
2. The host app declares a federated remote named `remote` and points it to `http://localhost:5174/remoteEntry.js`.
3. The host imports the remote component dynamically with `React.lazy`.
4. The host passes state and callbacks to the remote widget as props.
5. The widget renders in the host while remaining owned by the remote app.

This means the host is not importing the remote source directly. Instead, it is consuming a runtime-loaded package boundary, which is the real module federation behavior.

## Configuration used

### Host configuration
In `host/vite.config.js`:
- `name: 'host'`
- `filename: 'remoteEntry.js'`
- `remotes.remote.entry: 'http://localhost:5174/remoteEntry.js'`
- shared dependencies:
  - `react`
  - `react-dom`
  - `@reduxjs/toolkit`
  - `react-redux`

### Remote configuration
In `remote/vite.config.js`:
- `name: 'remote'`
- `filename: 'remoteEntry.js'`
- `exposes: { './RemoteWidget': './src/components/RemoteWidget.jsx' }`
- shared dependencies:
  - `react`
  - `react-dom`
  - `@reduxjs/toolkit`
  - `react-redux`

### Type support
A minimal `tsconfig.json` is included in both app folders so the `@module-federation/vite` DTS plugin can run during development and build.

## Redux state model

Both apps use their own Redux Toolkit store with the same state shape:

- `hostCounter`
- `remoteCounter`
- `status`
- `lastSync`

The host store is the source of truth for the widget that is rendered in the host shell. The remote widget is stateless and receives its values through props.

## Local run instructions

### Start the host
```bash
cd host
npm install
npm run dev
```

### Start the remote
```bash
cd remote
npm install
npm run dev
```

Then open:
- `http://localhost:5173/` for the host
- `http://localhost:5174/` for the remote

## Build commands

### Host build
```bash
cd host
npm run build
```

### Remote build
```bash
cd remote
npm run build
```

## Verification

The current setup was verified with fresh commands:
- `cd host && npm run build`
- `cd remote && npm run build`

Both commands completed successfully and produced federated bundles.

Runtime verification was also performed in the browser:
- The host page loaded and rendered the remote widget.
- Clicking `Increment remote` updated both the host and remote widget counters, proving that the host was rendering the federated component and the shared UI state was flowing through the federated boundary.

## Notes

- The remote build can log a non-blocking DTS download warning in development, but the build still succeeds and the federated runtime works.
- The generated `remote/.mf` directory is not committed.
