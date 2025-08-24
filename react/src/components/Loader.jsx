import React from 'react';
import { Spin } from 'antd';

const Loader = ({ size = 'large', tip = 'Loading...', style = {} }) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '2rem',
        ...style 
      }}
    >
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default Loader;
