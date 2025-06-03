// import React from 'react';
// import { Table, Tag, Button, Space, Avatar, Tooltip } from 'antd';
// import { DeleteOutlined, UserOutlined, CrownOutlined, ToolOutlined, CustomerServiceOutlined } from '@ant-design/icons';

// const UserList = ({ users, loading, onDeleteUser, currentUserId }) => {
  
//   // פונקציה להחזרת צבע התג לפי תפקיד
//   const getRoleColor = (role) => {
//     switch (role) {
//       case 'admin': return 'red';
//       case 'developer': return 'blue';
//       case 'support': return 'green';
//       // default: return 'default';
//     }
//   };

//   // פונקציה להחזרת אייקון לפי תפקיד
//   const getRoleIcon = (role) => {
//     switch (role) {
//       case 'admin': return <CrownOutlined />;
//       case 'developer': return <ToolOutlined />;
//       case 'support': return <CustomerServiceOutlined />;
//       default: return <UserOutlined />;
//     }
//   };

//   // פונקציה להחזרת טקסט בעברית לתפקיד
//   const getRoleText = (role) => {
//     switch (role) {
//       case 'admin': return 'אדמין';
//       case 'developer': return 'מפתח';
//       case 'support': return 'תמיכה';
//       default: return role;
//     }
//   };

//   const columns = [
//     {
//       title: 'משתמש',
//       dataIndex: 'userName',
//       key: 'userName',
//       render: (text, record) => (
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <Avatar 
//             icon={<UserOutlined />} 
//             style={{ 
//               backgroundColor: record._id === currentUserId ? '#1890ff' : '#f56a00'
//             }}
//           />
//           <div>
//             <div style={{ fontWeight: 'bold' }}>
//               {text}
//               {record._id === currentUserId && (
//                 <Tag color="blue" style={{ marginRight: 8, fontSize: '10px' }}>
//                   אתה
//                 </Tag>
//               )}
//             </div>
//             <div style={{ fontSize: '12px', color: '#666' }}>
//               {record.email}
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: 'תפקיד',
//       dataIndex: 'role',
//       key: 'role',
//       render: (role) => (
//         <Tag 
//           color={getRoleColor(role)} 
//           icon={getRoleIcon(role)}
//           style={{ 
//             borderRadius: '12px',
//             padding: '4px 12px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 4,
//             width: 'fit-content'
//           }}
//         >
//           {getRoleText(role)}
//         </Tag>
//       ),
//     },
//     {
//       title: 'פעולות',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Tooltip title={record._id === currentUserId ? "לא ניתן למחוק את עצמך" : "מחק משתמש"}>
//             <Button 
//               type="primary" 
//               danger 
//               icon={<DeleteOutlined />}
//               size="small"
//               disabled={record._id === currentUserId}
//               onClick={() => onDeleteUser(record)}
//               style={{ borderRadius: '6px' }}
//             >
//               מחק
//             </Button>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       dataSource={users}
//       loading={loading}
//       rowKey="_id"
//       pagination={{
//         pageSize: 10,
//         showSizeChanger: true,
//         showQuickJumper: true,
//         showTotal: (total, range) => 
//           `${range[0]}-${range[1]} מתוך ${total} משתמשים`,
//       }}
//       locale={{
//         emptyText: 'אין משתמשים ',
//         filterTitle: 'סינון',
//         filterConfirm: 'אישור',
//         filterReset: 'איפוס',
//         selectAll: 'בחר הכל',
//         selectInvert: 'הפוך בחירה',
//       }}
//       style={{ marginTop: 16 }}
//     />
//   );
// };

// export default UserList;
import React from 'react';
import { Table, Tag, Button, Space, Avatar, Tooltip, Typography } from 'antd';
import { DeleteOutlined, UserOutlined, CrownOutlined, ToolOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import './UserList.css';

const { Text } = Typography;

const UserList = ({ users, loading, onDeleteUser, currentUserId }) => {
  
  // פונקציה להחזרת צבע התג לפי תפקיד
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'var(--admin-color)';
      case 'developer': return 'var(--developer-color)';
      case 'support': return 'var(--support-color)';
      default: return 'default';
    }
  };

  // פונקציה להחזרת צבע הרקע לפי תפקיד
  const getRoleBgColor = (role) => {
    switch (role) {
      case 'admin': return 'rgba(245, 34, 45, 0.1)';
      case 'developer': return 'rgba(24, 144, 255, 0.1)';
      case 'support': return 'rgba(82, 196, 26, 0.1)';
      default: return 'rgba(0, 0, 0, 0.05)';
    }
  };

  // פונקציה להחזרת אייקון לפי תפקיד
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <CrownOutlined />;
      case 'developer': return <ToolOutlined />;
      case 'support': return <CustomerServiceOutlined />;
      default: return <UserOutlined />;
    }
  };

  // פונקציה להחזרת טקסט בעברית לתפקיד
  const getRoleText = (role) => {
    switch (role) {
      case 'admin': return 'אדמין';
      case 'developer': return 'מפתח';
      case 'support': return 'תמיכה';
      default: return role;
    }
  };

  const columns = [
    {
      title: 'משתמש',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => (
        <div className="user-card">
          <div className="user-avatar-container">
            <Avatar 
              icon={<UserOutlined />} 
              className="user-avatar"
              style={{ 
                backgroundColor: record._id === currentUserId ? 'var(--primary)' : getRoleColor(record.role),
                boxShadow: `0 2px 8px ${record._id === currentUserId ? 'rgba(24, 144, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
              }}
              size="large"
            />
            <div className="user-info">
              <Text strong className="user-name">
                {text}
                {record._id === currentUserId && (
                  <Tag className="current-user-tag">
                    אתה
                  </Tag>
                )}
              </Text>
              <Text type="secondary" className="user-email">
                {record.email}
              </Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'תפקיד',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag 
          className="user-role-tag"
          style={{ 
            color: getRoleColor(role),
            backgroundColor: getRoleBgColor(role),
            border: `1px solid ${getRoleColor(role)}`
          }}
        >
          {getRoleIcon(role)}
          {getRoleText(role)}
        </Tag>
      ),
    },
    {
      title: 'פעולות',
      key: 'actions',
      render: (_, record) => (
        <div className="action-buttons">
          <Tooltip title={record._id === currentUserId ? "לא ניתן למחוק את עצמך" : "מחק משתמש"}>
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />}
              disabled={record._id === currentUserId}
              onClick={() => onDeleteUser(record)}
              className="delete-button"
            >
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="user-list-container">
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} מתוך ${total} משתמשים`,
        }}
        locale={{
          emptyText: 'אין משתמשים במערכת',
          filterTitle: 'סינון',
          filterConfirm: 'אישור',
          filterReset: 'איפוס',
          selectAll: 'בחר הכל',
          selectInvert: 'הפוך בחירה',
        }}
        className="users-table"
        rowClassName="table-row"
      />
    </div>
  );
};

export default UserList;