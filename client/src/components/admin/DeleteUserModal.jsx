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
  modalIcon: { // Changed from deleteModalIcon
    fontSize: '48px',
    color: '#007AFF', // Primary blue for icon
  },
  modalTitle: { // Changed from deleteModalTitle
    marginBottom: '12px',
    fontSize: '22px',
    fontWeight: 600,
    color: '#2c3e50',
  },
  userToDeleteInfo: {
    background: '#F4F5F7', // Light gray background
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'inline-block',
    border: '1px solid #E0E0E0',
  },
  userIcon: {
    marginRight: '8px', // RTL: marginLeft
    color: '#8e8e93',
  },
  userNameText: {
    fontWeight: 500, // Semi-bold
    color: '#2c3e50',
  },
  userEmailDelete: {
    display: 'block',
    fontSize: '13px',
    color: '#8e8e93',
    marginTop: '4px',
  },
  warningText: { // Changed from deleteWarningText
    display: 'block',
    marginBottom: '24px',
    fontSize: '15px',
    color: '#2c3e50', // Primary text color for warning
    lineHeight: '1.6',
  },
  modalDivider: {
    margin: '0 0 24px 0',
  },
  modalActions: { // Changed from deleteModalActions
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  cancelButton: {
    borderRadius: '8px',
    minWidth: '120px',
  },
  confirmButton: { // Changed from confirmDeleteButton
    borderRadius: '8px',
    minWidth: '120px',
    // No longer danger, AntD default primary or just default
    // To make it look like a primary action:
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    color: '#FFFFFF',
    // If you want a more subtle delete, use type="default" and style accordingly
    // e.g. color: '#007AFF', borderColor: '#007AFF' for an outline button
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
      width={440} // Adjusted width
      closable={true} // User can close with 'x'
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
            // type="primary" // Use default or primary based on desired emphasis
            icon={<DeleteOutlined />}
            onClick={onConfirm}
            style={styles.confirmButton} // No longer 'danger'
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