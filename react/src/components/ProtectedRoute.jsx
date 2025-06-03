import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spin, Layout } from 'antd';
import useCurrentUser from '../hooks/useCurrentUser';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, error } = useCurrentUser();

  if (loading) {
    return (
      <Layout style={{ 
        minHeight: '100vh', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Spin size="large" />
      </Layout>
    );
  }

  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  // בדיקת הרשאת תפקיד ספציפי
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/HomePage" replace />;
  }

  return children;
};

export default ProtectedRoute;