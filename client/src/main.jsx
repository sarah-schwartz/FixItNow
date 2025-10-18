// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom';
// import { configureStore } from '@reduxjs/toolkit';
// import UserSlice from './Store/UserSlice'
// import RequestSlice from './slices/NewRequestSlice';





// const myStore = configureStore({
//   reducer:{
//     UserSlice,
//    RequestSlice,
//   }
// })


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={myStore}>
//   <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import RequestSlice from './Store/RequestSlice';

export const store = configureStore({
  reducer: {
    newRequest: RequestSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ['persist/PERSIST'],
  //     },
  //   }),
  // devTools: process.env.NODE_ENV !== 'production',
});
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
