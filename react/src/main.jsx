import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import UserSlice from './Store/UserSlice'
import { configureStore } from '@reduxjs/toolkit';





// import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';

const myStore = configureStore({
  reducer:{
    
    UserSlice,
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={myStore}>
  <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </StrictMode>,
)

