// App.js
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './theme/globalStyles.css';

import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute'; // ודא שהנתיב נכון

// Lazy loaded components
const LazyLogin = React.lazy(() => import("./components/Login"));
const LazySignin = React.lazy(() => import("./components/SignIn"));
const LazyHomePage = React.lazy(() => import("./components/HomePage"));
const LazyMyRequests = React.lazy(() => import("./components/MyRequests"));
const LazyAssignedToMeRequests = React.lazy(() => import("./components/AssignedToMeRequests")); // רכיב חדש
const LazyPage404 = React.lazy(() => import("./components/NotFound"));
const LazyRequestDetailes = React.lazy(() => import("./components/RequestDetailes"));
const LazyAddRequest = React.lazy(() => import("./components/AddRequestForm/AddRequestForm"));
// const LazyAddRequest = React.lazy(() => import("./components/admin/UserManagment"));
const LazyProfile = React.lazy(() => import("./components/Profile"));
const LazyAllRequests = React.lazy(() => import("./components/AllRequests")); // לאדמין
const Header = React.lazy(() => import('./components/Header'));
const LazyUserManagment = React.lazy(() => import("./components/admin/UserManagment"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
      </Suspense>

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LazyLogin />} />
        <Route path='/login' element={<Suspense fallback={<Loader />}><LazyLogin /></Suspense>} />
        <Route path='/signin' element={<Suspense fallback={<Loader />}><LazySignin /></Suspense>} />

        {/* Protected Routes */}
        <Route 
          path='/HomePage' 
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}><LazyHomePage /></Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/Profile' 
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}><LazyProfile /></Suspense>
            </ProtectedRoute>
          } 
        />
        
        {/* Routes for developers, supports, and admins */}
        <Route 
          path='/MyRequests' 
          element={
            <ProtectedRoute requiredRole={['developer', 'support', 'admin']}>
              <Suspense fallback={<Loader />}><LazyMyRequests /></Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/MyRequests/:id' 
          element={
            <ProtectedRoute requiredRole={['developer', 'support', 'admin']}>
              <Suspense fallback={<Loader />}><LazyRequestDetailes /></Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/AddRequest' 
          element={
            <ProtectedRoute requiredRole={['developer', 'support', 'admin']}>
              <Suspense fallback={<Loader />}><LazyAddRequest /></Suspense>
            </ProtectedRoute>
          } 
        />

        {/* Route for supports */}
        <Route 
          path='/AssignedToMe' 
          element={
            <ProtectedRoute requiredRole={['support', 'admin']}> 
              <Suspense fallback={<Loader />}><LazyAssignedToMeRequests /></Suspense>
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path='/AllRequests' 
          element={
            <ProtectedRoute requiredRole={['admin']}>
              <Suspense fallback={<Loader />}><LazyAllRequests /></Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/UserManagment" 
          element={
            <ProtectedRoute requiredRole={['admin']}>
              <Suspense fallback={<Loader />}><LazyUserManagment /></Suspense>
            </ProtectedRoute>
          } 
        />
        
        {/* Not Found Route */}
        <Route path="*" element={<Suspense fallback={<Loader />}><LazyPage404 /></Suspense>} />
      </Routes>
    </>
  );
}

export default App;