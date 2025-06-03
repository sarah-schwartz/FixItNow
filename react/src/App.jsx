import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './theme/globalStyles.css';

import Loader from './components/Loader';
import Login from './components/Login';
const LazyLogin = React.lazy(() => import("./components/Login"));
const LazySignin = React.lazy(() => import("./components/SignIn"));
const LazyHomePage = React.lazy(() => import("./components/HomePage"));
const LazyMyRequests = React.lazy(() => import("./components/MyRequests"));
const LazyPage404 = React.lazy(() => import("./components/NotFound"));
const LazyRequestDetailes = React.lazy(() => import("./components/RequestDetailes"));
const LazyAddRequest = React.lazy(() => import("./components/AddRequestForm/AddRequestForm"));
const LazyProfile = React.lazy(() => import("./components/Profile"));
const LazyAllRequests = React.lazy(() => import("./components/AllRequests"));
const Header = React.lazy(() => import('./components/Header'));
const LazyUserManagment = React.lazy(()=> import("./components/admin/UserManagment"))
function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
      </Suspense>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Suspense fallback={<Loader />}><LazyLogin /></Suspense>} />
        <Route path='/Signin' element={<Suspense fallback={<Loader />}><LazySignin /></Suspense>} />
        <Route path='/AllRequests' element={<Suspense fallback={<Loader />}><LazyAllRequests /></Suspense>} />
        <Route path='/HomePage' element={<Suspense fallback={<Loader />}><LazyHomePage /></Suspense>} />
        <Route path='/Profile' element={<Suspense fallback={<Loader />}><LazyProfile /></Suspense>} />
        <Route path='/MyRequests' element={<Suspense fallback={<Loader />}><LazyMyRequests /></Suspense>} />
        <Route path='/MyRequests/:id' element={<Suspense fallback={<Loader />}><LazyRequestDetailes /></Suspense>} />
        <Route path='/AddRequest' element={<Suspense fallback={<Loader />}><LazyAddRequest /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<Loader />}><LazyPage404 /></Suspense>} />
        <Route path="/admin/users" element={<Suspense fallback={<Loader />}><LazyUserManagment /></Suspense>} />
      </Routes>
      

    </>
  );
}

export default App;
