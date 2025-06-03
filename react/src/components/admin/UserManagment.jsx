// import React, { useState, useEffect } from 'react';
// import { Layout, Card, message, Spin } from 'antd';
// import { TeamOutlined } from '@ant-design/icons';
// import UserList from './UserList';
// import AddUserModal from './AddUserModal';
// import DeleteUserModal from './DeleteUserModal';
// import UserActions from './UserActions';
// import useCurrentUser from '../../hooks/useCurrentUser';
// import axios from '../../services/axiosInstance';

// const { Content, Header } = Layout;

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
  
//   const { user: currentUser, loading: userLoading } = useCurrentUser();

//   // טעינת כל המשתמשים
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/api/user/getAllUsers');
//       console.log(response.data)
//       setUsers(response.data);
//     } catch (error) {
//       console.error('שגיאה בטעינת משתמשים:', error);
//       message.error('שגיאה בטעינת רשימת המשתמשים');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (currentUser && currentUser.role === 'admin') {
//       fetchUsers();
//     }
//   }, [currentUser, refreshTrigger]);

//   // רענון הרשימה
//   const handleRefresh = () => {
//     setRefreshTrigger(prev => prev + 1);
//   };

//   // פתיחת מודל הוספת משתמש
//   const handleAddUser = () => {
//     setAddModalVisible(true);
//   };

//   // פתיחת מודל מחיקת משתמש
//   const handleDeleteUser = (user) => {
//     setSelectedUser(user);
//     setDeleteModalVisible(true);
//   };

//   // הוספת משתמש חדש
//   const handleUserAdded = async (userData) => {
//     try {
//       const response = await axios.post('/auth/register', userData);
//       if (response.status === 200) {
//         message.success('משתמש נוסף בהצלחה');
//         setAddModalVisible(false);
//         handleRefresh();
        
//         // שליחת מייל התראה
//         try {
//           await axios.post("/Email/send-email", {
//             to: userData.email,
//             subject: "חשבון חדש נוצר במערכת",
//             text: `שלום ${userData.userName}, חשבון חדש נוצר עבורך במערכת עם התפקיד: ${userData.role}`,
//           });
//         } catch (emailError) {
//           console.error('שגיאה בשליחת מייל:', emailError);
//         }
//       }
//     } catch (error) {
//       console.error('שגיאה בהוספת משתמש:', error);
//       message.error('שגיאה בהוספת המשתמש');
//     }
//   };

//   // מחיקת משתמש
//   const handleUserDeleted = async () => {
//     try {
//       // כאן תצטרך להוסיף את הנתיב למחיקת משתמש בשרת
//       // const response = await axios.delete(`/user/${selectedUser._id}`);
      
//       // לעת עתה רק מדמה מחיקה מהרשימה המקומית
//       setUsers(prev => prev.filter(user => user._id !== selectedUser._id));
//       message.success('משתמש נמחק בהצלחה');
//       setDeleteModalVisible(false);
//       setSelectedUser(null);
//     } catch (error) {
//       console.error('שגיאה במחיקת משתמש:', error);
//       message.error('שגיאה במחיקת המשתמש');
//     }
//   };

//   // בדיקת הרשאות
//   if (userLoading) {
//     return (
//       <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
//         <Spin size="large" />
//       </Layout>
//     );
//   }

//   if (!currentUser || currentUser.role !== 'admin') {
//     return (
//       <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
//         <Card style={{ textAlign: 'center' }}>
//           <h2>אין הרשאת גישה</h2>
//           <p>דף זה מיועד למנהלי מערכת בלבד</p>
//         </Card>
//       </Layout>
//     );
//   }

//   return (
//     <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
//       <Header style={{ 
//         background: '#fff', 
//         padding: '0 24px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         display: 'flex',
//         alignItems: 'center'
//       }}>
//         <TeamOutlined style={{ fontSize: '24px', marginLeft: '12px' }} />
//         <h1 style={{ margin: 0, fontSize: '20px' }}>ניהול משתמשים</h1>
//       </Header>
      
//       <Content style={{ padding: '24px' }}>
//         <Card>
//           <UserActions 
//             onAddUser={handleAddUser}
//             onRefresh={handleRefresh}
//             loading={loading}
//             userCount={users.length}
//           />
          
//           <UserList 
//             users={users}
//             loading={loading}
//             onDeleteUser={handleDeleteUser}
//             currentUserId={currentUser._id}
//           />
//         </Card>

//         <AddUserModal 
//           visible={addModalVisible}
//           onClose={() => setAddModalVisible(false)}
//           onSubmit={handleUserAdded}
//         />

//         <DeleteUserModal 
//           visible={deleteModalVisible}
//           user={selectedUser}
//           onClose={() => {
//             setDeleteModalVisible(false);
//             setSelectedUser(null);
//           }}
//           onConfirm={handleUserDeleted}
//         />
//       </Content>
//     </Layout>
//   );
// };

// export default UserManagement;
import React, { useState, useEffect } from 'react';
import { Layout, Card, message, Spin, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import DeleteUserModal from './DeleteUserModal';
import UserActions from './UserActions';
import useCurrentUser from '../../hooks/useCurrentUser';
import axios from '../../services/axiosInstance';
import './UserManagement.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const { user: currentUser, loading: userLoading } = useCurrentUser();

  // טעינת כל המשתמשים
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/getAllUsers');
      console.log(response.data);
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

  // רענון הרשימה
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // פתיחת מודל הוספת משתמש
  const handleAddUser = () => {
    setAddModalVisible(true);
  };

  // פתיחת מודל מחיקת משתמש
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  };

  // הוספת משתמש חדש
  const handleUserAdded = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      if (response.status === 200) {
        message.success({
          content: 'משתמש נוסף בהצלחה',
          className: 'custom-message-success',
        });
        setAddModalVisible(false);
        handleRefresh();
        
        // שליחת מייל התראה
        try {
          await axios.post("/Email/send-email", {
            to: userData.email,
            subject: "חשבון חדש נוצר במערכת",
            text: `שלום ${userData.userName}, חשבון חדש נוצר עבורך במערכת עם התפקיד: ${userData.role}`,
          });
        } catch (emailError) {
          console.error('שגיאה בשליחת מייל:', emailError);
        }
      }
    } catch (error) {
      console.error('שגיאה בהוספת משתמש:', error);
      message.error({
        content: 'שגיאה בהוספת המשתמש',
        className: 'custom-message-error',
      });
    }
  };

  // מחיקת משתמש
  const handleUserDeleted = async () => {
    try {
      // כאן תצטרך להוסיף את הנתיב למחיקת משתמש בשרת
      // const response = await axios.delete(`/user/${selectedUser._id}`);
      
      // לעת עתה רק מדמה מחיקה מהרשימה המקומית
      setUsers(prev => prev.filter(user => user._id !== selectedUser._id));
      message.success({
        content: 'משתמש נמחק בהצלחה',
        className: 'custom-message-success',
      });
      setDeleteModalVisible(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('שגיאה במחיקת משתמש:', error);
      message.error({
        content: 'שגיאה במחיקת המשתמש',
        className: 'custom-message-error',
      });
    }
  };

  // בדיקת הרשאות
  if (userLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Paragraph className="loading-text">טוען נתונים...</Paragraph>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="access-denied-container">
        <Card className="access-denied-card">
          <TeamOutlined className="access-denied-icon" />
          <Title level={2}>אין הרשאת גישה</Title>
          <Paragraph>דף זה מיועד למנהלי מערכת בלבד</Paragraph>
        </Card>
      </div>
    );
  }

  return (
    <Layout className="user-management-layout">
      <div className="user-management-header fade-in">
        <div className="header-content">
          <div className="header-icon-container">
            <TeamOutlined className="header-icon" />
          </div>
          <div className="header-text">
            <Title level={2} className="header-title">ניהול משתמשים</Title>
            <Paragraph className="header-description">
              ניהול משתמשים, הרשאות, ותפקידים במערכת
            </Paragraph>
          </div>
        </div>
      </div>
      
      <Content className="user-management-content">
        <Card className="main-card fade-in">
          <UserActions 
            onAddUser={handleAddUser}
            onRefresh={handleRefresh}
            loading={loading}
            userCount={users.length}
          />
          
          <UserList 
            users={users}
            loading={loading}
            onDeleteUser={handleDeleteUser}
            currentUserId={currentUser._id}
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