import React, { useState, useEffect } from 'react';
import { Layout, Card, message, Spin, Typography } from 'antd';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import DeleteUserModal from './DeleteUserModal';
import UserActions from './UserActions';
import useCurrentUser from '../../hooks/useCurrentUser';
import axios from '../../services/axiosInstance';

const { Content } = Layout;
const { Paragraph } = Typography;

const styles = {
  userManagementLayout: {
    minHeight: '100vh',
    backgroundColor: '#F4F5F7',
  },
  userManagementHeader: {
    background: 'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '50px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  headerIconContainer: {
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '50%',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: '20px',
    color: '#fff',
  },
  userManagementContent: {
    padding: '24px',
  },
  mainCard: {
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: 'none',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F4F5F7',
  },
  loadingText: {
    marginTop: '16px',
    fontSize: '16px',
    color: '#8e8e93',
  },
  accessDeniedContainer: {},
  accessDeniedCard: {},
  accessDeniedIcon: {},
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const { user: currentUser, loading: userLoading } = useCurrentUser();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('שגיאה בטעינת משתמשים:', error);
      message.error('שגיאה בטעינת רשימת המשתמשים');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      fetchUsers();
    }
  }, [currentUser, refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
    setSearchTerm('');
    setRoleFilter('all');
  };

  const handleAddUser = () => setAddModalVisible(true);

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  };

  const handleUserAdded = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      if (response.status === 200) {
        message.success('משתמש נוסף בהצלחה');
        setAddModalVisible(false);
        handleRefresh();
      }
    } catch (error) {
      console.error('שגיאה בהוספת משתמש:', error);
      message.error('שגיאה בהוספת המשתמש');
    }
  };

  const handleUserDeleted = async () => {
    setUsers(prev => prev.filter(user => user._id !== selectedUser._id));
    message.success('משתמש נמחק בהצלחה');
    setDeleteModalVisible(false);
    setSelectedUser(null);
  };

  if (userLoading) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" />
        <Paragraph style={styles.loadingText}>טוען נתונים...</Paragraph>
      </div>
    );
  }

  const filteredUsers = users.filter(user => {
    const matchesSearchTerm = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearchTerm && matchesRole;
  });

  return (
    <Layout style={styles.userManagementLayout}>
      <Content style={styles.userManagementContent}>
        <Card style={styles.mainCard}>
          <UserActions
            onAddUser={handleAddUser}
            onRefresh={handleRefresh}
            loading={loading}
            userCount={filteredUsers.length}
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            currentRoleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            availableRoles={['all', 'admin', 'developer', 'support']}
          />
          <UserList
            users={filteredUsers}
            loading={loading}
            onDeleteUser={handleDeleteUser}
            currentUserId={currentUser?._id}
          />
        </Card>

        <AddUserModal
          visible={addModalVisible}
          onClose={() => setAddModalVisible(false)}
          onSubmit={handleUserAdded}
        />
        <DeleteUserModal
          visible={deleteModalVisible}
          user={selectedUser}
          onClose={() => {
            setDeleteModalVisible(false);
            setSelectedUser(null);
          }}
          onConfirm={handleUserDeleted}
        />
      </Content>
    </Layout>
  );
};

export default UserManagement;
