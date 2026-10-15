import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AppBoundary from './components/AppBoundary'
import MotionSettings from './components/MotionSettings'
import './index.css'
import './learning.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppBoundary>
      <BrowserRouter>
        <MotionSettings>
          <App />
        </MotionSettings>
      </BrowserRouter>
    </AppBoundary>
  </React.StrictMode>
)
