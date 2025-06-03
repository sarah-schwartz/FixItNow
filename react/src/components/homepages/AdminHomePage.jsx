import React from 'react';
import NavigationCard from '../NavigationCard';
import { Layout, Row, Col } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';

const AdminHomePage = () => {
  const cards = [
    { icon: <ProfileOutlined />, title: 'ניהול משתמשים', link: '/admin/users' },
    { icon: <ProfileOutlined />, title: 'צפייה בכל הבקשות', link: '/AllRequests' },
  ];

  return (
    <Layout style={{ padding: '40px' }}>
      <Row gutter={[32, 32]}>
        {cards.map((item, i) => (
          <Col key={i} xs={24} sm={12} md={8}>
            <NavigationCard {...item} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default AdminHomePage;
