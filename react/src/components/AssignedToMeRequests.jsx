// components/AssignedToMeRequests.js
import React from 'react';
import { Table, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../hooks/useTickets'; // נניח שה-hook גנרי מספיק
import { useTicketsFilter } from '../hooks/useTicketsFilter';
import { getTicketsColumns } from './TicketsTableConfig'; // ניתן להשתמש באותה תצורת עמודות
import TicketsFilter from './TicketsFilter';
import Loader from './Loader';

const { Title } = Typography;

const AssignedToMeRequests = () => {
  const navigate = useNavigate();
  // השתמש בנתיב החדש שיצרת ב-API עבור פניות שהוקצו למשתמש
  const { tickets, loading, error } = useTickets('/Ticket/assigned-to-me'); 
  const { filteredData, filterStates, filterSetters } = useTicketsFilter(tickets);

  if (loading) return <div><Loader/></div>;
  if (error) return <div>שגיאה בטעינת הפניות: {error.message}</div>;

  return (
    <Layout style={{ minHeight: '85vh' }}>
      <div style={{ padding: '60px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>ממתין לאישור</Title>

        <TicketsFilter 
          filterStates={filterStates}
          filterSetters={filterSetters}
        />

        <Table
          columns={getTicketsColumns()} // אפשר להתאים אם יש צורך בעמודות שונות
          dataSource={filteredData.map((item) => ({ ...item, key: item._id }))}
          onRow={(record) => ({
            onClick: () => {
              // נווט לדף פרטי הפניה, אולי תצטרך נתיב נפרד או להתאים את הקיים
              navigate(`/MyRequests/${record._id}`); // או נתיב ייעודי כמו /AssignedRequests/${record._id}
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