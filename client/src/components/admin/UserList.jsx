import React from 'react';
import { Table, Tag, Button, Space, Avatar, Tooltip, Typography } from 'antd';
import { DeleteOutlined, UserOutlined, CrownOutlined, ToolOutlined, CustomerServiceOutlined, EditOutlined } from '@ant-design/icons'; // Added EditOutlined for potential future use

const { Text } = Typography;

const getRoleVisuals = (role) => {
  const commonTagStyle = {
    borderRadius: '16px', 
    padding: '3px 10px',
    fontSize: '12px',
    display: 'inline-flex', 
    alignItems: 'center',
    gap: '5px',
    border: '1px solid', 
    fontWeight: 500,
    lineHeight: '1.5', 
  };

  switch (role) {
    case 'admin': return { color: '#D946EF', borderColor: '#D946EF', backgroundColor: 'rgba(217, 70, 239, 0.08)', icon: <CrownOutlined />, text: 'אדמין', ...commonTagStyle };  
    case 'developer': return { color: '#3B82F6', borderColor: '#3B82F6', backgroundColor: 'rgba(59, 130, 246, 0.08)', icon: <ToolOutlined />, text: 'מפתח', ...commonTagStyle }; 
    case 'support': return { color: '#10B981', borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.08)', icon: <CustomerServiceOutlined />, text: 'תמיכה', ...commonTagStyle }; 
    default: return { color: '#6B7280', borderColor: '#6B7280', backgroundColor: 'rgba(107, 114, 128, 0.08)', icon: <UserOutlined />, text: role, ...commonTagStyle }; 
  }
};

const styles = {
  userListContainer: {
  },
  userCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0', 
  },
  avatar: (isCurrentUser, role) => {
    const roleVisual = getRoleVisuals(role);
    return {
      backgroundColor: isCurrentUser ? '#007AFF' : roleVisual.backgroundColor, // Use role's light bg or primary for current user
      color: isCurrentUser ? '#FFFFFF' : roleVisual.color, 
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      minWidth: '40px',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right', 
  },
  userName: {
    fontWeight: 600, 
    fontSize: '14px',
    color: '#2c3e50',
    lineHeight: '1.4',
  },
  currentUserBadge: {
    marginLeft: '8px', 
    fontSize: '10px',
    color: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderColor: 'rgba(0, 122, 255, 0.3)',
    padding: '1px 6px',
    borderRadius: '4px',
  },
  userEmail: {
    fontSize: '13px',
    color: '#8e8e93',
    lineHeight: '1.4',
  },
  actionButton: { 
    borderRadius: '6px',
    color: '#6B7280', 
    borderColor: '#E0E0E0', 
  },
};

const UserList = ({ users, loading, onDeleteUser, currentUserId }) => {
  const columns = [
    {
      title: 'משתמש',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => {
        const isCurrentUser = record._id === currentUserId;
        return (
          <div style={styles.userCell}>
            <Avatar
              icon={<UserOutlined />} 
              style={styles.avatar(isCurrentUser, record.role)}
              size="large"
            >
            </Avatar>
            <div style={styles.userInfo}>
              <Text style={styles.userName}>
                {text}
                {isCurrentUser && (
                  <Tag style={styles.currentUserBadge}>אתה</Tag>
                )}
              </Text>
              <Text style={styles.userEmail}>{record.email}</Text>
            </div>
          </div>
        );
      },
    },
    {
      title: 'תפקיד',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const roleVisual = getRoleVisuals(role);
        return (
          <Tag style={{ 
            color: roleVisual.color, 
            backgroundColor: roleVisual.backgroundColor, 
            borderColor: roleVisual.borderColor,
            ...roleVisual 
          }}>
            {React.cloneElement(roleVisual.icon, { style: { fontSize: '14px', marginRight: '4px' }})} 
            {roleVisual.text}
          </Tag>
        );
      },
    },
    {
      title: '', 
      key: 'actions',
      align: 'left', 
      render: (_, record) => (
        <Space>
          <Tooltip title={record._id === currentUserId ? "לא ניתן למחוק את המשתמש הנוכחי" : "מחק משתמש"}>
            <Button
              icon={<DeleteOutlined />}
              disabled={record._id === currentUserId}
              onClick={() => onDeleteUser(record)}
              style={{...styles.actionButton, color: record._id !== currentUserId ? '#E53E3E' : '#B0B0B0' }} // A slightly more distinct delete color, but not primary red
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={styles.userListContainer}>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="_id"
        pagination={{
          pageSize: 8, 
          showSizeChanger: false,
          style: {direction: 'rtl', marginTop: '20px'}
        }}
        locale={{ emptyText: 'לא נמצאו משתמשים התואמים את החיפוש' }}
        style={styles.usersTable}
      />
    </div>
  );
};

export default UserList;