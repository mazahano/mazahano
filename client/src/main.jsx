import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// Set base URL for production. In dev, it defaults to "" so the Vite proxy works.
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "";



import { ShopProvider } from './context/ShopContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </StrictMode>,
)
