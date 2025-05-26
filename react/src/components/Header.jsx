// import React, { lazy, Suspense } from 'react';
// import { Layout } from 'antd';
// const Logo = lazy(() => import('./Logo'));
// import { Link } from 'react-router-dom';

// const { Header: AntHeader } = Layout;

// const Header = () => {
//   return (
//     <AntHeader
//       style={{
//         width: '100%',
//         height:'15vh',
//         padding: '0 24px',
//         background: '#001529',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         position: 'sticky',
//         top: 0,
//         zIndex: 1
//       }}
//     >
//       <Suspense fallback={<div>Loading...</div>}>
//       <Link to ="/HomePage">
//         <Logo />
//         </Link>
//       </Suspense>
//       <div 
//         style={{ 
//           color: 'white',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px'
//         }}
//       >
//       </div>
//     </AntHeader>
//   );
// };

// export default Header;
import React, { lazy, Suspense } from 'react';
import { Layout, Avatar, Dropdown, Button, Badge, theme } from 'antd';
import { BellOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Logo = lazy(() => import('./Logo'));
const { Header: AntHeader } = Layout;
const { useToken } = theme;

function Header() {
  const { token } = useToken();

  const menuItems = [
    { key: 'profile', label: 'הפרופיל שלי' },
    { key: 'settings', label: 'הגדרות' },
    { key: 'logout', label: 'התנתק', danger: true },
  ];

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
        <Suspense fallback={<div style={{ color: 'white' }}>טוען...</div>}>
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
        <Button 
          type="text" 
          icon={<MenuOutlined style={{ color: 'white', fontSize: '18px' }} />}
          style={{ display: 'none'}}
        />
        
        <Badge count={3} dot>
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
        </Badge>
        
        <Dropdown 
          menu={{ items: menuItems }} 
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
            <span style={{ marginLeft: '8px', fontWeight: 500 }}>שלום, משתמש</span>
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
}

export default Header;