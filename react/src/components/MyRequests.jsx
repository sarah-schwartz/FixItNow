import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Layout, Select, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useTransformData from '../hooks/useTransformData';

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
  dataIndex: 'tags',
  key: 'tags',
  render: (priority) => {
    let color;
    if (priority === 'נמוך') color = 'geekblue';
    else if (priority === 'רגיל') color = 'green';
    else if (priority === 'דחוף') color = 'volcano';
    else color = 'default';
    return <Tag color={color}>{priority}</Tag>;
  },
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

const urgencyOptions = ['נמוך', 'רגיל', 'דחוף'];
const statusOptions = ['ממתין', 'בטיפול', 'הושלם'];

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

  // אנחנו נשתמש ב-hook useTransformData עבור כל פנייה בנפרד
  // אבל מכיוון ש-hook לא ניתן לקרוא בתוך לולאה, נשנה את הגישה:
  // במקום זה, ניצור פונקציה אסינכרונית שעוברת על הפניות ומעבדת אותן.

  useEffect(() => {
    const fetchAndTransformTickets = async () => {
      try {
        setLoadingTickets(true);
        setErrorTickets(null);
        const userRes = await axios.get("http://localhost:8080/auth/me", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        console.log(userRes.data.id)


        // 1. הבאת כל הפניות מהשרת
        const res = await axios.get(
          `http://localhost:8080/Ticket/my-tickets/${userRes.data.id}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(res)
        const rawTickets = res.data;

        // 2. פונקציה שמדמה את useTransformData (משתמשת באותה לוגיקה)
        // מאחר ואין אפשרות לקרוא hook בתוך לולאה, נעתיק כאן לוגיקה דומה:
        async function transformTicket(t) {
          // שליפת שם משתמש
          const userResponse = await axios.get('http://localhost:8080/auth/me', {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          });
          console.log(t.type)
          // שליפת שם קטגוריה
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
            name: userResponse.data.userName,
            category: categoryResponse.data,
            date: formatDateOnly(t.createdAt),
            tags: t.priority, // ניתן לשפר לפי הדחיפות אם יש שדה מתאים ב-t
            status: t.status,
          };
        }

        // 3. המרת כל הפניות במקביל
        const transformedTickets = await Promise.all(rawTickets.map(t => transformTicket(t)));
        console.log(transformedTickets)
        setTickets(transformedTickets);
      } catch (err) {
        setErrorTickets(err);
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchAndTransformTickets();
  }, []);

  // סינון לפי הקלטים מהמשתמש
  const filteredData = tickets.filter((row) => {
    const matchesUrgency = !urgencyFilter || row.tags.includes(urgencyFilter);
    const matchesStatus = !statusFilter || row.status === statusFilter;
    const matchesSearch = row.name.includes(searchText);
    const matchesCategory = !categorySearch || row.category.includes(categorySearch);
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
          dataSource={filteredData}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/MyRequests/${record.key}`);
            },
            style: { cursor: 'pointer' },
          })}
        />
      </div>
    </Layout>
  );
};

export default MyRequests;
