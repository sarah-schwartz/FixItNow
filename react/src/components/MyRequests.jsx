import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tag, Space, Layout, Select, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
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

// הגדרת אפשרויות סינון מתוך הקונסטנטים
const urgencyOptions = Object.entries(PRIORITY_LABELS_HE).map(([value, label]) => ({
  value,
  label
}));

const statusOptions = Object.entries(STATUS_LABELS_HE).map(([value, label]) => ({
  value,
  label
}));

const MyRequests = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [errorTickets, setErrorTickets] = useState(null);

  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');

  useEffect(() => {
    const fetchAndTransformTickets = async () => {
      try {
        setLoadingTickets(true);
        setErrorTickets(null);

        const userRes = await axios.get("http://localhost:8080/auth/me", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });

        const res = await axios.get(
          `http://localhost:8080/Ticket/my-tickets/${userRes.data.id}`,
          { headers: { 'Content-Type': 'application/json' } }
        );

        const rawTickets = res.data;

        async function transformTicket(t) {
          const userResponse = await axios.get('http://localhost:8080/auth/me', {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          });

          const categoryResponse = await axios.get(
            `http://localhost:8080/Categories/getCategoryNameById/${t.type}`,
            { headers: { 'Content-Type': 'application/json' } }
          );

          function formatDateOnly(isoString) {
            const date = new Date(isoString);
            return date.toLocaleDateString('he-IL');
          }

          return {
            key: t._id,
            _id: t._id,
            name: userResponse.data.userName,
            category: categoryResponse.data, // מחזיר מפתח באנגלית
            date: formatDateOnly(t.createdAt),
            tags: t.priority,
            status: t.status,
          };
        }

        const transformedTickets = await Promise.all(rawTickets.map(t => transformTicket(t)));
        setTickets(transformedTickets);
      } catch (err) {
        setErrorTickets(err);
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchAndTransformTickets();
  }, []);

  const filteredData = tickets.filter((row) => {
    const matchesUrgency = !urgencyFilter || row.tags === urgencyFilter;
    const matchesStatus = !statusFilter || row.status === statusFilter;
    const matchesSearch = row.name.includes(searchText);
    const matchesCategory = !categorySearch || getCategoryLabel(row.category).includes(categorySearch);
    const matchesDate = !dateSearch || row.date.includes(dateSearch);
    return matchesUrgency && matchesStatus && matchesSearch && matchesCategory && matchesDate;
  });

  if (loadingTickets) return <div>טוען פניות...</div>;
  if (errorTickets) return <div>שגיאה בטעינת הפניות: {errorTickets.message}</div>;

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
            options={urgencyOptions}
            allowClear
          />
          <Select
            placeholder="סנן לפי סטטוס"
            style={{ width: 160 }}
            value={statusFilter || undefined}
            onChange={setStatusFilter}
            options={statusOptions}
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
