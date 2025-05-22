import Login from './Components/Login'
import './App.css'
import Header from './Components/Header'
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './theme/globalStyles.css';

const LazyLogin = React.lazy(() => import("./Components/Login"))
const LazySignin = React.lazy(() => import("./Components/SignIn"))
const LazyHomePage = React.lazy(() => import("./Components/HomePage"))
const LazyMyRequests = React.lazy(() => import("./Components/MyRequests"))
const LazyPage404 = React.lazy(() => import("./Components/NotFound"))
const LazyRequestDetailes = React.lazy(() => import("./Components/RequestDetailes"))
const LazyAddRequest = React.lazy(() => import("./Components/AddRequestForm/AddRequestForm"))
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Suspense fallback={'loading...'}><LazyLogin /></Suspense>} />
        <Route path='/Signin' element={<Suspense fallback={'loading...'}><LazySignin /></Suspense>} />
        <Route path='/HomePage' element={<Suspense fallback={'loading...'}><LazyHomePage /></Suspense>} />
        <Route path='/MyRequests' element={<Suspense fallback={'loading...'}><LazyMyRequests /></Suspense>} />
        <Route path='/MyRequests/:id' element={<Suspense fallback={'loading...'}><LazyRequestDetailes /></Suspense>} />
        <Route path='/AddRequest' element={<Suspense fallback={'loading...'}><LazyAddRequest /></Suspense>} />
        <Route path="*" element={<Suspense fallback={'loading...'}><LazyPage404 /></Suspense>} />

      </Routes>
    </>
  )
}
export default App



