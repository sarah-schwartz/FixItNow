import React from 'react';
import { Card, Avatar, Typography, Descriptions, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

const { Title } = Typography;
const { Content } = Layout;

const ProfilePage = () => {
  const userData = {
    name: 'חני ורצברגר',
    email: 'chani@example.com',
    role: 'מנהלת מערכת',
    picture: useSelector(state=>state.UserSlice.picture)
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content
        style={{
          maxWidth: '800px',
          margin: 'auto',
          padding: '40px 24px',
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
            שלום {userData.name}
          </Title>

          <Descriptions
            bordered
            column={1}
            layout="horizontal"
            size="middle"
            style={{ marginTop: 24 }}
            labelStyle={{ fontWeight: 'bold', width: '30%' }}
          >
            <Descriptions.Item label="שם מלא">{userData.name}</Descriptions.Item>
            <Descriptions.Item label="אימייל">{userData.email}</Descriptions.Item>
            <Descriptions.Item label="תפקיד">{userData.role}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProfilePage;