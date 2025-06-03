import React from 'react';
import { Table, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axiosInstance'; 
import Loader from './Loader'
import { Input, Tag } from 'antd';

import {
  getPriorityLabel,
  getCategoryLabel,
  getStatusLabel,
  PRIORITY_LABELS_HE,
  STATUS_LABELS_HE
} from '../constants/constants';

const { Search } = Input;

const columns = [
  {
    title: 'שם עובד',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'קטגוריה',
    dataIndex: 'category',
    key: 'category',
    render: (catKey) => getCategoryLabel(catKey)
  },
  {
    title: 'תאריך',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'דחיפות',
    dataIndex: 'tags',
    key: 'tags',
    render: (priority) => {
      const translated = getPriorityLabel(priority);
      let color;
      if (translated === 'נמוכה') color = 'geekblue';
      else if (translated === 'בינונית') color = 'green';
      else if (translated === 'גבוהה') color = 'volcano';
      else color = 'default';
      return <Tag color={color}>{translated}</Tag>;
    },
  },
  {
    title: 'סטטוס',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const translated = getStatusLabel(status);
      let color;
      if (translated === 'ממתין') color = 'orange';
      else if (translated === 'בטיפול') color = 'blue';
      else if (translated === 'הושלם') color = 'green';
      else color = 'default';
      return <Tag color={color}>{translated}</Tag>;
    },
  },
];

const urgencyOptions = Object.entries(PRIORITY_LABELS_HE).map(([value, label]) => ({
  value,
  label
}));

const statusOptions = Object.entries(STATUS_LABELS_HE).map(([value, label]) => ({
  value,
  label
}));
import { useTickets } from '../hooks/useTickets';
import { useTicketsFilter } from '../hooks/useTicketsFilter';
import { getTicketsColumns } from './TicketsTableConfig';
import TicketsFilter from './TicketsFilter';

const AllRequests = () => {
  const navigate = useNavigate();
  const { tickets, loading, error } = useTickets('/Ticket', false);
  const { filteredData, filterStates, filterSetters } = useTicketsFilter(tickets);

  if (loading) return <div><Loader/></div>;
  if (error) return <div>שגיאה בטעינת הפניות: {error.message}</div>;

  return (
    <Layout style={{ minHeight: '85vh' }}>
      <div style={{ padding: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>כל הבקשות</h2>

        <TicketsFilter 
          filterStates={filterStates}
          filterSetters={filterSetters}
        />

        <Table
          columns={getTicketsColumns()}
          dataSource={filteredData.map((item, index) => ({ ...item, key: item._id || index }))}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/AllRequests/${record._id}`);
            },
            style: { cursor: 'pointer' },
          })}
        />
      </div>
    </Layout>
  );
};

export default AllRequests;