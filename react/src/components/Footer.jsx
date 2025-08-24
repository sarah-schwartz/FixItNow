import React from 'react';
import { Layout, Typography } from 'antd';
import { HeartFilled, CopyrightOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <AntFooter
      style={{
        background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f2f5 100%)',
        padding: '24px 50px',
        borderTop: '1px solid rgba(22, 119, 255, 0.1)',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <CopyrightOutlined style={{ color: '#1677ff' }} />
        <Text>{currentYear} FixItNow. All rights reserved.</Text>
      </div>
      
      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <Text type="secondary">Made with</Text>
        <HeartFilled style={{ color: '#ff4d4f', fontSize: '14px' }} />
        <Text type="secondary">by the development team</Text>
      </div>
    </AntFooter>
  );
};

export default Footer;