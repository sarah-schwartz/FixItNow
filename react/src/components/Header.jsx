import React, { lazy, Suspense } from 'react';
import { Layout } from 'antd';
const Logo = lazy(() => import('./Logo'));

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader
      style={{
        width: '100%',
        height:'15vh',
        padding: '0 24px',
        background: '#001529',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Logo />
      </Suspense>
      <div 
        style={{ 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
      </div>
    </AntHeader>
  );
};

export default Header;
