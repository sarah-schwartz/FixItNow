import React from 'react';
import { Card } from 'antd';
import { FrownOutlined } from '@ant-design/icons';

const NotFound = () => {
  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgb(226, 226, 226)',
      padding: '24px'
    }}>
      <Card
        style={{
          textAlign: 'center',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '400px',
          padding: '40px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      >
        <FrownOutlined style={{ fontSize: '4rem', color: '#1677ff', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>אופס! הדף לא נמצא</h2>
        <p style={{ fontSize: '16px' }}>הקישור שהזנת לא קיים או הועבר למקום אחר.</p>
      </Card>
    </div>
  );
};

export default NotFound;
