import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import ShoppingCartProvider from './context/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
<ShoppingCartProvider>
  <App/>
</ShoppingCartProvider>
 </BrowserRouter>
)
