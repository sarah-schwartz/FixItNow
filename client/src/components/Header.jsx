import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Button, Badge, theme } from 'antd';
import { BellOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from '../services/axiosInstance';
const Logo = lazy(() => import('./Logo'));
const { Header: AntHeader } = Layout;
const { useToken } = theme;

const Header = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/auth/me`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setUsername(response.data.userName);
      } catch (err) {
        console.error("שגיאה בקבלת שם משתמש:", err);
      }
    };

    fetchUser();
  }, []);

  const menuItems = [
    { key: 'MyRequests', label: 'הבקשות שלי' },
    { key: 'profile', label: 'פרופיל' },
    { key: 'logout', label: 'התנתק', danger: true },
  ];

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'logout':
        localStorage.clear();
        axios.get("/auth/logout");
        navigate("/Login");
        break;
      case 'MyRequests':
        navigate("/MyRequests");
        break;
      case 'profile':
        navigate('/Profile');
        break;
      default:
        console.log('פריט לא ידוע בתפריט:', e.key);
    }
  };

  return (
    <AntHeader
      style={{
        width: '100%',
        height: '15vh',
        padding: '0 24px',
        background: 'linear-gradient(135deg, #001529 0%, #003a70 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div className="header-left">
        <Suspense fallback={<div style={{ color: 'white' }}><Loader/></div>}>
          <Link to="/HomePage" style={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Link>
        </Suspense>
      </div>

      <div className="header-right" style={{
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* <Badge count={3} dot>
          <Button
            type="text"
            icon={<BellOutlined style={{ color: 'white', fontSize: '18px' }} />}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
          />
        </Badge> */}



        <Dropdown
          menu={{ items: menuItems, onClick: handleMenuClick }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
        >
          <div style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
          }}>
            
            <Avatar
              icon={<UserOutlined />}
              style={{
                backgroundColor: token.colorPrimary,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
              }}
            />
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
