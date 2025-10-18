import React from 'react';
import { Button, Space, Typography, Tooltip, Input, Divider, Select } from 'antd';
import { PlusOutlined, UserOutlined, SearchOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const styles = {
  userActionsContainer: {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#FFFFFF', 
    borderRadius: '8px', 
  },
  topRow: { 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userIconWrapper: {
    backgroundColor: 'rgba(0, 122, 255, 0.08)', // Light primary blue background
    borderRadius: '50%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCountIcon: {
    fontSize: '20px',
    color: '#007AFF', 
  },
  userCountTitle: {
    margin: 0,
    fontSize: '20px', 
    fontWeight: 600,
    color: '#2c3e50', 
  },
  userCountNumber: {
    fontSize: '14px',
    color: '#8e8e93', 
  },
  filtersRow: { 
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap', 
  },
  searchInput: {
    flexGrow: 1, 
    minWidth: '200px', 
    borderRadius: '8px',
  },
  roleSelect: {
    minWidth: '180px', 
    borderRadius: '8px',
  },
  refreshButtonContainer: { 
    marginLeft: 'auto',
  },
  addButton: {
    borderRadius: '8px',
    backgroundColor: '#007AFF', 
    borderColor: '#007AFF',
  },
  refreshButton: {
    borderRadius: '8px',
  },
  divider: {
    marginTop: '24px',
    marginBottom: '0px',
  }
};

const UserActions = ({ 
  onAddUser, onRefresh, loading, userCount, 
  onSearch, searchTerm, 
  currentRoleFilter, onRoleFilterChange, availableRoles 
}) => {

  const roleLabels = {
    all: 'כל התפקידים',
    admin: 'אדמינים',
    developer: 'מפתחים',
    support: 'אנשי תמיכה'
  };

  return (
    <div style={styles.userActionsContainer}>
      <div style={styles.topRow}>
        <div style={styles.userInfoContainer}>
          <div style={styles.userIconWrapper}>
            <UserOutlined style={styles.userCountIcon} />
          </div>
          <div>
            <Title level={4} style={styles.userCountTitle}>
              משתמשי המערכת
            </Title>
            <Text style={styles.userCountNumber}>
              סה"כ {userCount} משתמשים פעילים
            </Text>
          </div>
        </div>
        <Space style={styles.mainActionsGroup}>
          <Tooltip title="הוסף משתמש חדש">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onAddUser}
              style={styles.addButton}
              size="large"
            >
              הוסף משתמש
            </Button>
          </Tooltip>
        </Space>
      </div>

      <Divider style={{ margin: '20px 0'}} />

      <div style={styles.filtersRow}>
        <Input
          placeholder="חיפוש לפי שם או מייל..."
          prefix={<SearchOutlined style={{color: '#8e8e93'}} />}
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          style={styles.searchInput}
          allowClear
          size="large"
        />
        <Select
          value={currentRoleFilter}
          onChange={onRoleFilterChange}
          style={styles.roleSelect}
          size="large"
          suffixIcon={<FilterOutlined style={{color: '#8e8e93'}} />}
        >
          {availableRoles.map(role => (
            <Option key={role} value={role}>
              {roleLabels[role] || role}
            </Option>
          ))}
        </Select>
        <div style={styles.refreshButtonContainer}>
          <Tooltip title="רענן רשימה וסננים">
            <Button
              icon={<ReloadOutlined />}
              onClick={onRefresh}
              loading={loading}
              style={styles.refreshButton}
              size="large"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default UserActions;