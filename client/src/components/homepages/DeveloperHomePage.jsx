import React from 'react';
import NavigationCard from '../NavigationCard';
import { Layout, Row, Col } from 'antd';
import {
  ProfileOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const DeveloperHomePage = () => {
  const cards = [
    { icon: <ProfileOutlined />, title: 'הבקשות שלי', link: '/MyRequests' },
    { icon: <PlusCircleOutlined />, title: 'הגשת בקשה', link: '/AddRequest' },
    { icon: <ClockCircleOutlined />, title: 'ממתין לאישור', link: '/AllRequests' },
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

export default DeveloperHomePage;
