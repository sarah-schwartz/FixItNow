// components/MyRequests.js
import React from 'react';
import { Table, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../hooks/useTickets';
import { useTicketsFilter } from '../hooks/useTicketsFilter';
import { getTicketsColumns } from './TicketsTableConfig';
import TicketsFilter from './TicketsFilter';
import Loader from './Loader';

const MyRequests = () => {
  const navigate = useNavigate();
  const { tickets, loading, error } = useTickets('/Ticket/my-tickets');
  const { filteredData, filterStates, filterSetters } = useTicketsFilter(tickets);

  if (loading) return <div><Loader/></div>;
  if (error) return <div>שגיאה בטעינת הפניות: {error.message}</div>;

  return (
    <Layout style={{ minHeight: '85vh' }}>
      <div style={{ padding: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>הבקשות שלי</h2>

        <TicketsFilter 
          filterStates={filterStates}
          filterSetters={filterSetters}
        />

        <Table
          columns={getTicketsColumns()}
          dataSource={filteredData.map((item, index) => ({ ...item, key: item._id || index }))}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/MyRequests/${record._id}`);
            },
            style: { cursor: 'pointer' },
          })}
        />
      </div>
    </Layout>
  );
};

export default MyRequests;