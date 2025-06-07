// components/AssignedToMeRequests.js
import React from 'react';
import { Table, Layout, Typography, Empty, Alert } from 'antd'; // ייבוא Alert ו-Empty
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../hooks/useTickets';
import { useTicketsFilter } from '../hooks/useTicketsFilter';
import { getTicketsColumns } from './TicketsTableConfig';
import TicketsFilter from './TicketsFilter';
import Loader from './Loader';

const { Title } = Typography;

const AssignedToMeRequests = () => {
  const navigate = useNavigate();
  const { tickets, loading, error } = useTickets('/Ticket/assigned-to-me');
  const { filteredData, filterStates, filterSetters } = useTicketsFilter(tickets);

  if (loading) {
    return (
      <Layout style={{ minHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout style={{ minHeight: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Empty
            description="אין עבורך פניות שלא טופלו."
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '85vh' }}>
      <div style={{ padding: '60px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>ממתין לאישור</Title>

        <TicketsFilter
          filterStates={filterStates}
          filterSetters={filterSetters}
        />
 (
          <Table
            columns={getTicketsColumns()}
            dataSource={filteredData.map((item) => ({ ...item, key: item._id }))}
            onRow={(record) => ({
              onClick: () => {
                navigate(`/MyRequests/${record._id}`);
              },
              style: { cursor: 'pointer' },
            })}
            rowKey="_id"
          />
        )
      </div>
    </Layout>
  );
};

export default AssignedToMeRequests;