import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Descriptions, Layout, Alert, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from '../services/axiosInstance';

const { Title } = Typography;
const { Content } = Layout;

const ProfilePage = () => {
  console.log(':', document.cookie);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log('Fetching profile data...');
        
        const response = await axios.get('/auth/me', {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log('Profile response:', response);
        
        setName(response.data.userName);
        setEmail(response.data.email);
        setRole(response.data.role);
        setError('');
      } catch (err) {
        console.error("שגיאה בשליפת נתוני פרופיל:", err);
        
        if (err.response?.status === 401) {
          setError('אנא התחבר מחדש למערכת');
          // אפשר להפנות לדף התחברות
          // window.location.href = '/login';
        } else {
          setError('שגיאה בטעינת הפרופיל');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = originalOverflow;
  };
}, []);

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Content style={{ maxWidth: '800px', margin: 'auto', padding: '40px 24px' }}>
          <Alert
            message="שגיאה"
            description={error}
            type="error"
            showIcon
          />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content
        style={{
          maxWidth: '800px',
          margin: 'auto',
          padding: '40px 24px',
          height: '100vh'
        }}
      >
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff, #f5f9ff)',
          }}
        >
          <Avatar
            size={100}
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#1890ff',
              marginBottom: 24,
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            }}
          />
          <Title level={3} style={{ marginBottom: 8 }}>
            שלום {name}
          </Title>
          <Descriptions
            bordered
            column={1}
            layout="horizontal"
            size="middle"
            style={{ marginTop: 24 }}
            labelStyle={{ fontWeight: 'bold', width: '30%' }}
          >
            <Descriptions.Item label="שם מלא">{name}</Descriptions.Item>
            <Descriptions.Item label="אימייל">{email}</Descriptions.Item>
            <Descriptions.Item label="תפקיד">{role}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProfilePage;