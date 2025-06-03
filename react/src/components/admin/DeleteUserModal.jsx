// import React from 'react';
// import { Modal, Typography, Space, Button } from 'antd';
// import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

// const { Text } = Typography;

// const DeleteUserModal = ({ visible, onClose, onConfirm, user }) => {
//   return (
//     <Modal
//       title={
//         <Space>
//           <ExclamationCircleOutlined style={{ color: 'red' }} />
//           <span>מחיקת משתמש</span>
//         </Space>
//       }
//       open={visible}
//       onCancel={onClose}
//       footer={[
//         <Button key="cancel" onClick={onClose}>
//           ביטול
//         </Button>,
//         <Button 
//           key="delete" 
//           type="primary" 
//           danger 
//           icon={<DeleteOutlined />} 
//           onClick={onConfirm}
//         >
//           מחק
//         </Button>,
//       ]}
//       centered
//     >
//       <Text>
//         האם אתה בטוח שברצונך למחוק את המשתמש{' '}
//         <Text strong>{user?.userName}</Text>?
//       </Text>
//     </Modal>
//   );
// };

// export default DeleteUserModal;
import React from 'react';
import { Modal, Typography, Space, Button, Divider } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import './DeleteUserModal.css';

const { Text, Title } = Typography;

const DeleteUserModal = ({ visible, onClose, onConfirm, user }) => {
  if (!user) return null;
  
  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="delete-user-modal"
      width={400}
    >
      <div className="delete-modal-content">
        <div className="delete-modal-icon">
          <ExclamationCircleOutlined />
        </div>
        
        <Title level={4} className="delete-modal-title">מחיקת משתמש</Title>
        
        <div className="user-to-delete-info">
          <div className="user-icon">
            <UserOutlined />
          </div>
          <Text strong>{user?.userName}</Text>
          <Text type="secondary" className="user-email-delete">{user?.email}</Text>
        </div>
        
        <Text className="delete-warning-text">
          האם אתה בטוח שברצונך למחוק את המשתמש? פעולה זו אינה ניתנת לביטול.
        </Text>
        
        <Divider className="modal-divider" />
        
        <div className="delete-modal-actions">
          <Button key="cancel" onClick={onClose} className="cancel-button">
            ביטול
          </Button>
          <Button 
            key="delete" 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={onConfirm}
            className="confirm-delete-button"
          >
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;