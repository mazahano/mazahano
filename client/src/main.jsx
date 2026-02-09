import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// Set base URL for production. In dev, it defaults to "" so the Vite proxy works.
// Set base URL for production using ShopContext instead, or here but ensure correctness
// For now, let's rely on the ShopContext config to avoid conflicts, or set it here safely.
// Since ShopContext sets it, we can remove this line or comment it out to avoid double assignment confusion.
// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "";




import { ShopProvider } from './context/ShopContext';

console.log('Mounting React Application...');
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopProvider>
      <div className="app-wrapper">
        <App />
      </div>
    </ShopProvider>
  </StrictMode>,
)
