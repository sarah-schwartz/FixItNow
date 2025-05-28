import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tag, Space, Layout, Select, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

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
  },
  {
    title: 'תאריך',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'דחיפות',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag === 'נמוך' ? 'geekblue' : 'green';
          if (tag === 'דחוף') color = 'volcano';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'סטטוס',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color;
      if (status === 'ממתין') color = 'orange';
      else if (status === 'בטיפול') color = 'blue';
      else if (status === 'הושלם') color = 'green';
      else color = 'default';
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const data = [
  { key: '1', name: 'טובה כהן', category: '32', date: '03/11/2024', tags: ['רגיל'], status: 'ממתין' },
  { key: '2', name: 'לאה רוזן', category: '45', date: '21/05/2024', tags: ['דחוף'], status: 'הושלם' },
  { key: '3', name: 'שירה לב', category: '28', date: '28/2/2025', tags: ['נמוך'], status: 'בטיפול' },
  // הוסיפי שורות נוספות לפי הצורך
];

const urgencyOptions = ['נמוך', 'רגיל', 'דחוף'];
const statusOptions = ['ממתין', 'בטיפול', 'הושלם'];

const MyRequests = () => {
  const navigate = useNavigate();
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');

  const filteredData = data.filter((row) => {
    const matchesUrgency =
      !urgencyFilter || row.tags.includes(urgencyFilter);
    const matchesStatus =
      !statusFilter || row.status === statusFilter;
    const matchesSearch = row.name.includes(searchText);
    const matchesCategory = !categorySearch || row.category.includes(categorySearch);
    const matchesDate = !dateSearch || row.date.includes(dateSearch);

    return matchesUrgency && matchesStatus && matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <Layout style={{ minHeight: '85vh' }}>
      <div style={{ padding: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>הבקשות שלי</h2>

        <Space wrap style={{ marginBottom: '24px' }}>
          <Select
            placeholder="סנן לפי דחיפות"
            style={{ width: 160 }}
            value={urgencyFilter || undefined}
            onChange={setUrgencyFilter}
            options={urgencyOptions.map(urgency => ({ label: urgency, value: urgency }))}
            allowClear
          />
          <Select
            placeholder="סנן לפי סטטוס"
            style={{ width: 160 }}
            value={statusFilter || undefined}
            onChange={setStatusFilter}
            options={statusOptions.map(status => ({ label: status, value: status }))}
            allowClear
          />
          <Input
            placeholder="חיפוש לפי קטגוריה"
            style={{ width: 160 }}
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            allowClear
          />
          <Input
            placeholder="חיפוש לפי תאריך"
            style={{ width: 160 }}
            value={dateSearch}
            onChange={(e) => setDateSearch(e.target.value)}
          />
          <Search
            placeholder="חיפוש לפי שם עובד"
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />
        </Space>

        <Table
          columns={columns}
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
