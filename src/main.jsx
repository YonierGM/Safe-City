import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './modules/context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CategoriesProvider } from './modules/context/CategoriesContext.jsx'
import { IncidentsProvider } from './modules/context/IncidentsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CategoriesProvider>
          <IncidentsProvider>
            <App />
          </IncidentsProvider>
        </CategoriesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
