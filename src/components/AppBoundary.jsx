import React from 'react'

export default class AppBoundary extends React.Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className="wrap" style={{ paddingBlock: '15vh', maxWidth: 720 }}>
        <p className="eyebrow mono">Anthroprime / Connection interrupted</p>
        <h1 className="editorial-title">Let’s get you back.</h1>
        <p className="text-muted" style={{ marginBlock: 24 }}>
          The page couldn’t finish loading. Reload to try again, or contact our
          infrastructure desk directly.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
          <a className="btn btn-secondary" href="mailto:hello@anthroprime.com">
            Contact the desk
          </a>
        </div>
      </main>
    )
  }
}
