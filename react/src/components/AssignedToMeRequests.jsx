import React from 'react';
import { Table, Layout, Typography } from 'antd';
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

  if (loading) return <div><Loader/></div>;
  if (error) return <div>Error loading requests: {error.message}</div>;

  return (
    <Layout style={{ minHeight: '85vh' }}>
      <div style={{ padding: '60px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Pending Approval
        </Title>

        <TicketsFilter 
          filterStates={filterStates}
          filterSetters={filterSetters}
        />

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
      </div>
    </Layout>
  );
};

export default AssignedToMeRequests;