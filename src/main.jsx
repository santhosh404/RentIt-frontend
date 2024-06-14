import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { OwnerContextProvider } from './contexts/owner/OwnerContext.jsx';
import { UserContextProvider } from './contexts/users/UserContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <OwnerContextProvider>
        <App />
      </OwnerContextProvider>
    </UserContextProvider>
  </BrowserRouter>
)
