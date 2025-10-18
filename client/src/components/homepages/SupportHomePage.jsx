import React from 'react';
import NavigationCard from '../NavigationCard';
import { Layout, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const SupportHomePage = () => {
  const cards = [
    { icon: <ClockCircleOutlined />, title: 'כל הבקשות', link: '/AllRequests' },
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

export default SupportHomePage;
