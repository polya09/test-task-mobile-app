import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/sora'
import '@fontsource-variable/inter'

import './styles/tokens.css'
import './styles/base.css'
import './styles/board.css'
import './styles/stylescape.css'
import './styles/design-system.css'
import './styles/app.css'

import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
