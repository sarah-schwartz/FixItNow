import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Typography, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, TeamOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';

const { Option } = Select;
const { Title } = Typography; // Text removed as not directly used

const styles = {
  modalTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  modalTitleIcon: {
    fontSize: '24px',
    color: '#007AFF', // Primary blue
  },
  modalTitleText: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    color: '#2c3e50',
  },
  formItem: {
    marginBottom: '20px', // Consistent spacing
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '28px',
  },
  submitButton: {
    borderRadius: '8px',
    minWidth: '120px',
    backgroundColor: '#007AFF', // Primary blue for main action
    borderColor: '#007AFF',
  },
  cancelButtonModal: {
    borderRadius: '8px',
    minWidth: '100px',
  },
  inputPrefixIcon: {
    color: 'rgba(0,0,0,0.35)' // Softer color for input prefixes
  }
};

const AddUserModal = ({ visible, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({ /* ... (same defaultValues) ... */ });
  const password = watch('password');

  useEffect(() => { /* ... (same effect) ... */ }, [visible, reset]);
  const handleFormSubmit = async (data) => { /* ... (same submission logic) ... */ };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={520} // Slightly wider for better form layout
      centered
      style={{ direction: 'rtl' }}
    >
      <div style={styles.modalTitleContainer}>
        <PlusCircleOutlined style={styles.modalTitleIcon} />
        <Title level={4} style={styles.modalTitleText}>יצירת משתמש חדש</Title>
      </div>
      
      <Divider style={{ marginBottom: '28px' }} />

      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        <Form.Item
          label="שם משתמש"
          validateStatus={errors.userName ? 'error' : ''}
          help={errors.userName?.message}
          style={styles.formItem}
        >
          <Controller
            name="userName"
            control={control}
            rules={{ required: 'יש להזין שם משתמש' }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined style={styles.inputPrefixIcon} />}
                placeholder="לדוגמה: ישראל ישראלי"
                size="large"
              />
            )}
          />
        </Form.Item>

        {/* ... (Email, Password, Confirm Password Form.Items with similar styling adjustments for prefix and placeholder) ... */}
         <Form.Item
          label="כתובת מייל"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
          style={styles.formItem}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'יש להזין כתובת מייל',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'כתובת מייל לא תקינה' }
            }}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<MailOutlined style={styles.inputPrefixIcon} />}
                placeholder="user@example.com"
                size="large"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="סיסמה"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
          style={styles.formItem}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'יש להזין סיסמה',
              minLength: { value: 6, message: 'הסיסמה חייבת להכיל לפחות 6 תווים' }
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined style={styles.inputPrefixIcon} />}
                placeholder="לפחות 6 תווים"
                size="large"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="אימות סיסמה"
          validateStatus={errors.confirm ? 'error' : ''}
          help={errors.confirm?.message}
          style={styles.formItem}
        >
          <Controller
            name="confirm"
            control={control}
            rules={{
              required: 'יש לאשר את הסיסמה',
              validate: value => value === password || 'הסיסמאות אינן תואמות'
            }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined style={styles.inputPrefixIcon} />}
                placeholder="הקלד שוב את הסיסמה"
                size="large"
              />
            )}
          />
        </Form.Item>


        <Form.Item
          label="תפקיד במערכת"
          validateStatus={errors.role ? 'error' : ''}
          help={errors.role?.message}
          style={styles.formItem}
        >
          <Controller
            name="role"
            control={control}
            rules={{ required: 'יש לבחור תפקיד' }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="בחר את תפקיד המשתמש"
                size="large"
                suffixIcon={<TeamOutlined style={styles.inputPrefixIcon} />}
                style={{ width: '100%'}}
              >
                <Option value="developer">מפתח</Option>
                <Option value="support">תמיכה</Option>
                <Option value="admin">אדמין</Option>
              </Select>
            )}
          />
        </Form.Item>
        
        <Divider style={{ marginTop: '28px', marginBottom: '20px' }}/>

        <div style={styles.modalActions}>
          <Button onClick={onClose} style={styles.cancelButtonModal} size="large">
            ביטול
          </Button>
          <Button type="primary" htmlType="submit" style={styles.submitButton} size="large">
            צור משתמש
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddUserModal;