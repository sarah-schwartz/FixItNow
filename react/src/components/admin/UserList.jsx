import React from 'react';
import { Table, Tag, Button, Space, Avatar, Tooltip, Typography } from 'antd';
import { DeleteOutlined, UserOutlined, CrownOutlined, ToolOutlined, CustomerServiceOutlined, EditOutlined } from '@ant-design/icons'; // Added EditOutlined for potential future use

const { Text } = Typography;

const getRoleVisuals = (role) => {
  const commonTagStyle = {
    borderRadius: '16px', // Pill shape
    padding: '3px 10px',
    fontSize: '12px',
    display: 'inline-flex', // For icon and text alignment
    alignItems: 'center',
    gap: '5px',
    border: '1px solid', // Border will be colored
    fontWeight: 500,
    lineHeight: '1.5', // Ensure text is vertically centered well
  };

  switch (role) {
    case 'admin': return { color: '#D946EF', borderColor: '#D946EF', backgroundColor: 'rgba(217, 70, 239, 0.08)', icon: <CrownOutlined />, text: 'אדמין', ...commonTagStyle }; // Purple
    case 'developer': return { color: '#3B82F6', borderColor: '#3B82F6', backgroundColor: 'rgba(59, 130, 246, 0.08)', icon: <ToolOutlined />, text: 'מפתח', ...commonTagStyle }; // Blue
    case 'support': return { color: '#10B981', borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.08)', icon: <CustomerServiceOutlined />, text: 'תמיכה', ...commonTagStyle }; // Green
    default: return { color: '#6B7280', borderColor: '#6B7280', backgroundColor: 'rgba(107, 114, 128, 0.08)', icon: <UserOutlined />, text: role, ...commonTagStyle }; // Gray
  }
};

const styles = {
  userListContainer: {
    // overflowX: 'auto', // For better responsiveness of table
  },
  userCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0', // Vertical padding for cell content
  },
  avatar: (isCurrentUser, role) => {
    const roleVisual = getRoleVisuals(role);
    return {
      backgroundColor: isCurrentUser ? '#007AFF' : roleVisual.backgroundColor, // Use role's light bg or primary for current user
      color: isCurrentUser ? '#FFFFFF' : roleVisual.color, // Icon color
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
    textAlign: 'right', // RTL
  },
  userName: {
    fontWeight: 600, // Bolder name
    fontSize: '14px',
    color: '#2c3e50',
    lineHeight: '1.4',
  },
  currentUserBadge: {
    marginLeft: '8px', // RTL: marginRight
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
  actionButton: { // For Delete and potential Edit buttons
    borderRadius: '6px',
    color: '#6B7280', // Neutral color for action icons
    borderColor: '#E0E0E0', // Light border
  },
  usersTable: {
    // AntD Table's own styles are usually good, can override here if needed
    // e.g. to remove cell padding:
    // '& .ant-table-thead > tr > th, & .ant-table-tbody > tr > td': {
    //   padding: '12px 8px', 
    // },
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
              icon={<UserOutlined />} // Default icon, can be overridden by role later if needed
              style={styles.avatar(isCurrentUser, record.role)}
              size="large"
            >
             {/* {text.substring(0,1).toUpperCase()} You can use initials if no image */}
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
            ...roleVisual // This applies borderRadius, padding, etc. from commonTagStyle
          }}>
            {React.cloneElement(roleVisual.icon, { style: { fontSize: '14px', marginRight: '4px' }})} {/* Style icon */}
            {roleVisual.text}
          </Tag>
        );
      },
    },
    {
      title: '', // No title for "פעולות" column
      key: 'actions',
      align: 'left', // RTL: align 'right' for actions
      render: (_, record) => (
        <Space>
          {/* Example for a future Edit button - keep it neutral */}
          {/* <Tooltip title="ערוך משתמש">
            <Button 
              icon={<EditOutlined />} 
              style={styles.actionButton}
              onClick={() => console.log('Edit user', record)} 
            />
          </Tooltip> */}
          <Tooltip title={record._id === currentUserId ? "לא ניתן למחוק את המשתמש הנוכחי" : "מחק משתמש"}>
            <Button
              icon={<DeleteOutlined />}
              disabled={record._id === currentUserId}
              onClick={() => onDeleteUser(record)}
              style={{...styles.actionButton, color: record._id !== currentUserId ? '#E53E3E' : '#B0B0B0' }} // A slightly more distinct delete color, but not primary red
              // For a completely neutral delete button:
              // style={styles.actionButton} 
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
        // remove AntD default cell padding if you want more control
        // onRow={(record, rowIndex) => {
        //   return { style: { cursor: 'pointer' } }; // Example: hover effect on row
        // }}
      />
    </div>
  );
};

export default UserList;