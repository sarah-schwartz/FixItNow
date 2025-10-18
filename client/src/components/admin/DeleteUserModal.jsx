import React from 'react';
import { Modal, Typography, Button, Divider } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'; // Changed icon

const { Text, Title } = Typography;

const styles = {
  deleteModalContent: {
    textAlign: 'center',
    padding: '20px',
  },
  modalIconContainer: {
    marginBottom: '16px',
  },
  modalIcon: { 
    fontSize: '48px',
    color: '#007AFF', 
  },
  modalTitle: { 
    marginBottom: '12px',
    fontSize: '22px',
    fontWeight: 600,
    color: '#2c3e50',
  },
  userToDeleteInfo: {
    background: '#F4F5F7', 
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'inline-block',
    border: '1px solid #E0E0E0',
  },
  userIcon: {
    marginRight: '8px', 
    color: '#8e8e93',
  },
  userNameText: {
    fontWeight: 500, 
    color: '#2c3e50',
  },
  userEmailDelete: {
    display: 'block',
    fontSize: '13px',
    color: '#8e8e93',
    marginTop: '4px',
  },
  warningText: { 
    display: 'block',
    marginBottom: '24px',
    fontSize: '15px',
    color: '#2c3e50', 
    lineHeight: '1.6',
  },
  modalDivider: {
    margin: '0 0 24px 0',
  },
  modalActions: { 
    justifyContent: 'center',
    gap: '12px',
  },
  cancelButton: {
    borderRadius: '8px',
    minWidth: '120px',
  },
  confirmButton: { 
    borderRadius: '8px',
    minWidth: '120px',
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    color: '#FFFFFF',
  },
};

const DeleteUserModal = ({ visible, onClose, onConfirm, user }) => {
  if (!user) return null;
  
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={440}
      closable={true} 
    >
      <div style={styles.deleteModalContent}>
        <div style={styles.modalIconContainer}>
          <QuestionCircleOutlined style={styles.modalIcon} /> {/* Changed Icon */}
        </div>
        
        <Title level={3} style={styles.modalTitle}>אישור מחיקה</Title>
        
        <div style={styles.userToDeleteInfo}>
          <UserOutlined style={styles.userIcon} />
          <Text style={styles.userNameText}>{user.userName}</Text>
          <Text style={styles.userEmailDelete}>{user.email}</Text>
        </div>
        
        <Text style={styles.warningText}>
          האם אתה בטוח שברצונך למחוק את המשתמש? <br/> לא ניתן לשחזר פעולה זו.
        </Text>
        
        <Divider style={styles.modalDivider} />
        
        <div style={styles.modalActions}>
          <Button onClick={onClose} style={styles.cancelButton} size="large">
            ביטול
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={onConfirm}
            style={styles.confirmButton} 
            size="large"
          >
            כן, מחק משתמש
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;