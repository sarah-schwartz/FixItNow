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
  },
];

const cityData = {
  דחיפות: ['נמוך', 'רגיל', 'דחוף'],
  סטטוס: ['ממתין', 'בטיפול', 'הושלם'],
};

const provinceData = ['דחיפות', 'סטטוס'];

const MyRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(provinceData[0]);
  const [searchText, setSearchText] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');

  const userID = '67eda8fc2b6e420787c7c907'; 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/Ticket/getAllTicketsByUserID/${userID}`);
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchRequests();
  }, [userID]);

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    setCities(cityData[value]);
    setSecondCity('');
  };

  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const filteredData = requests.filter((row) => {
    const matchesSearch = row.name?.includes(searchText);
    const matchesFilter =
      (!secondCity ||
        (selectedProvince === 'דחיפות' && row.tags?.includes(secondCity)) ||
        (selectedProvince === 'סטטוס' && row.status === secondCity));
    const matchesCategory = !categorySearch || row.category?.includes(categorySearch);
    const matchesDate = !dateSearch || row.date?.includes(dateSearch);
    return matchesSearch && matchesFilter && matchesCategory && matchesDate;
  });

  return (
    <Layout style={{ minHeight: '85vh' }}>
      <div style={{ padding: '60px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>הבקשות שלי</h2>

        <Space wrap style={{ marginBottom: '24px' }}>
          <Select
            defaultValue={provinceData[0]}
            style={{ width: 160 }}
            onChange={handleProvinceChange}
            options={provinceData.map((province) => ({ label: province, value: province }))}
          />
          <Select
            placeholder={`סנן לפי ${selectedProvince}`}
            style={{ width: 160 }}
            value={secondCity || undefined}
            onChange={onSecondCityChange}
            options={cities.map((city) => ({ label: city, value: city }))}
          />
          <Input
            placeholder="חיפוש לפי קטגוריה"
            style={{ width: 160 }}
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
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
