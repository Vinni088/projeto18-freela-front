import GlobalStyle from './style/GlobalStyle'
import ResetStyle from './style/ResetStyle'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
)
