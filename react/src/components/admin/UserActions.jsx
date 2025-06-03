// import React from 'react';
// import { Button, Space, Typography, Divider } from 'antd';
// import { PlusOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons';

// const { Title, Text } = Typography;

// const UserActions = ({ onAddUser, onRefresh, loading, userCount }) => {
//   return (
//     <div style={{ marginBottom: 24 }}>
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center',
//         marginBottom: 16 
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <UserOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
//           <Title level={4} style={{ margin: 0 }}>
//             רשימת משתמשים
//           </Title>
//           <Text type="secondary">({userCount} משתמשים)</Text>
//         </div>
        
//         <Space>
//           <Button 
//             icon={<ReloadOutlined />}
//             onClick={onRefresh}
//             loading={loading}
//             style={{ borderRadius: '6px' }}
//           >
//             רענון
//           </Button>
//           <Button 
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={onAddUser}
//             style={{ borderRadius: '6px' }}
//           >
//             הוסף משתמש
//           </Button>
//         </Space>
//       </div>
//       <Divider style={{ margin: '0 0 16px 0' }} />
//     </div>
//   );
// };

// export default UserActions;
import React from 'react';
import { Button, Space, Typography, Tooltip } from 'antd';
import { PlusOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons';
import './UserActions.css';

const { Title, Text } = Typography;

const UserActions = ({ onAddUser, onRefresh, loading, userCount }) => {
  return (
    <div className="user-actions-container">
      <div className="user-actions-header">
        <div className="user-count-container">
          <div className="user-count-icon-wrapper">
            <UserOutlined className="user-count-icon" />
          </div>
          <div className="user-count-text">
            <Title level={4} className="user-count-title">
              רשימת משתמשים
            </Title>
            <Text type="secondary" className="user-count-number">
              {userCount} משתמשים במערכת
            </Text>
          </div>
        </div>
        
        <Space className="action-buttons">
          <Tooltip title="הוסף משתמש חדש למערכת" placement="bottom">
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              onClick={onAddUser}
              className="add-button"
            >
              הוסף משתמש
            </Button>
          </Tooltip>
        </Space>
      </div>
      <div className="section-divider" />
    </div>
  );
};

export default UserActions;