// import React, { useEffect } from 'react';
// import { Modal, Form, Input, Select, Button } from 'antd';
// import { UserOutlined, MailOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';
// import { useForm, Controller } from 'react-hook-form';

// const { Option } = Select;

// const AddUserModal = ({ visible, onClose, onSubmit }) => {
//   const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       userName: '',
//       email: '',
//       password: '',
//       confirm: '',
//       role: ''
//     }
//   });

//   const password = watch('password');

//   // איפוס הטופס כשהמודל נסגר
//   useEffect(() => {
//     if (!visible) {
//       reset();
//     }
//   }, [visible, reset]);

//   const handleFormSubmit = async (data) => {
//     const { confirm, ...userData } = data;
//     await onSubmit(userData);
//     reset();
//   };

//   return (
//     <Modal
//       title={
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <UserOutlined />
//           <span>הוסף משתמש חדש</span>
//         </div>
//       }
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//       width={500}
//       style={{ direction: 'rtl' }}
//     >
//       <form onSubmit={handleSubmit(handleFormSubmit)} style={{ marginTop: 24 }}>
//         <div style={{ marginBottom: 16 }}>
//           <Controller
//             name="userName"
//             control={control}
//             rules={{ required: 'יש להזין שם משתמש' }}
//             render={({ field }) => (
//               <Form.Item validateStatus={errors.userName ? 'error' : ''} help={errors.userName?.message}>
//                 <Input
//                   {...field}
//                   prefix={<UserOutlined />}
//                   placeholder="שם משתמש"
//                   size="large"
//                 />
//               </Form.Item>
//             )}
//           />
//         </div>

//         <div style={{ marginBottom: 16 }}>
//           <Controller
//             name="email"
//             control={control}
//             rules={{
//               required: 'יש להזין כתובת מייל',
//               pattern: {
//                 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: 'כתובת מייל לא תקינה'
//               }
//             }}
//             render={({ field }) => (
//               <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
//                 <Input
//                   {...field}
//                   prefix={<MailOutlined />}
//                   placeholder="כתובת מייל"
//                   size="large"
//                 />
//               </Form.Item>
//             )}
//           />
//         </div>

//         <div style={{ marginBottom: 16 }}>
//           <Controller
//             name="password"
//             control={control}
//             rules={{
//               required: 'יש להזין סיסמה',
//               minLength: {
//                 value: 6,
//                 message: 'הסיסמה חייבת להכיל לפחות 6 תווים'
//               }
//             }}
//             render={({ field }) => (
//               <Form.Item validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
//                 <Input.Password
//                   {...field}
//                   prefix={<LockOutlined />}
//                   placeholder="סיסמה"
//                   size="large"
//                 />
//               </Form.Item>
//             )}
//           />
//         </div>

//         <div style={{ marginBottom: 16 }}>
//           <Controller
//             name="confirm"
//             control={control}
//             rules={{
//               required: 'יש לאשר את הסיסמה',
//               validate: value => value === password || 'הסיסמאות אינן תואמות'
//             }}
//             render={({ field }) => (
//               <Form.Item validateStatus={errors.confirm ? 'error' : ''} help={errors.confirm?.message}>
//                 <Input.Password
//                   {...field}
//                   prefix={<LockOutlined />}
//                   placeholder="אימות סיסמה"
//                   size="large"
//                 />
//               </Form.Item>
//             )}
//           />
//         </div>

//         <div style={{ marginBottom: 24 }}>
//           <Controller
//             name="role"
//             control={control}
//             rules={{ required: 'יש לבחור תפקיד' }}
//             render={({ field }) => (
//               <Form.Item validateStatus={errors.role ? 'error' : ''} help={errors.role?.message}>
//                 <Select
//                   {...field}
//                   placeholder="בחר תפקיד"
//                   size="large"
//                   suffixIcon={<TeamOutlined />}
//                 >
//                   <Option value="developer">מפתח</Option>
//                   <Option value="support">תמיכה</Option>
//                   <Option value="admin">אדמין</Option>
//                 </Select>
//               </Form.Item>
//             )}
//           />
//         </div>

//         <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
//           <Button onClick={onClose}>
//             ביטול
//           </Button>
//           <Button type="primary" htmlType="submit">
//             הוסף משתמש
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddUserModal;
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Typography, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import './AddUserModal.css';

const { Option } = Select;
const { Title, Text } = Typography;

const AddUserModal = ({ visible, onClose, onSubmit }) => {
  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirm: '',
      role: ''
    }
  });

  const password = watch('password');

  // איפוס הטופס כשהמודל נסגר
  useEffect(() => {
    if (!visible) {
      reset();
    }
  }, [visible, reset]);

  const handleFormSubmit = async (data) => {
    const { confirm, ...userData } = data;
    await onSubmit(userData);
    reset();
  };
  
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'var(--admin-color)';
      case 'developer': return 'var(--developer-color)';
      case 'support': return 'var(--support-color)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
      className="add-user-modal"
    >
      <div className="add-user-header">
        <UserOutlined className="add-user-icon" />
        <Title level={4} className="add-user-title">הוסף משתמש חדש</Title>
        <Text type="secondary" className="add-user-subtitle">
          הוסף משתמש חדש למערכת עם הרשאות מתאימות
        </Text>
      </div>
      
      <Divider className="add-user-divider" />
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="add-user-form">
        <div className="form-row">
          <div className="form-field">
            <label className="form-label">שם משתמש</label>
            <Controller
              name="userName"
              control={control}
              rules={{ required: 'יש להזין שם משתמש' }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.userName ? 'error' : ''} help={errors.userName?.message} className="custom-form-item">
                  <Input
                    {...field}
                    prefix={<UserOutlined className="field-icon" />}
                    placeholder="הכנס שם משתמש"
                    className="custom-input"
                  />
                </Form.Item>
              )}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label">דואר אלקטרוני</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'יש להזין כתובת מייל',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'כתובת מייל לא תקינה'
                }
              }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message} className="custom-form-item">
                  <Input
                    {...field}
                    prefix={<MailOutlined className="field-icon" />}
                    placeholder="הכנס כתובת מייל"
                    className="custom-input"
                    type="email"
                  />
                </Form.Item>
              )}
            />
          </div>
        </div>

        <div className="form-row two-columns">
          <div className="form-field">
            <label className="form-label">סיסמה</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'יש להזין סיסמה',
                minLength: {
                  value: 6,
                  message: 'הסיסמה חייבת להכיל לפחות 6 תווים'
                }
              }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.password ? 'error' : ''} help={errors.password?.message} className="custom-form-item">
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined className="field-icon" />}
                    placeholder="סיסמה"
                    className="custom-input"
                  />
                </Form.Item>
              )}
            />
          </div>

          <div className="form-field">
            <label className="form-label">אימות סיסמה</label>
            <Controller
              name="confirm"
              control={control}
              rules={{
                required: 'יש לאשר את הסיסמה',
                validate: value => value === password || 'הסיסמאות אינן תואמות'
              }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.confirm ? 'error' : ''} help={errors.confirm?.message} className="custom-form-item">
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined className="field-icon" />}
                    placeholder="אימות סיסמה"
                    className="custom-input"
                  />
                </Form.Item>
              )}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label">תפקיד</label>
            <Controller
              name="role"
              control={control}
              rules={{ required: 'יש לבחור תפקיד' }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.role ? 'error' : ''} help={errors.role?.message} className="custom-form-item">
                  <Select
                    {...field}
                    placeholder="בחר תפקיד"
                    className="custom-select"
                    suffixIcon={<TeamOutlined />}
                    popupClassName="role-select-dropdown"
                  >
                    <Option value="developer" className="role-option">
                      <div className="role-option-content">
                        <ToolOutlined style={{ color: getRoleColor('developer') }} />
                        <span>מפתח</span>
                      </div>
                    </Option>
                    <Option value="support" className="role-option">
                      <div className="role-option-content">
                        <CustomerServiceOutlined style={{ color: getRoleColor('support') }} />
                        <span>תמיכה</span>
                      </div>
                    </Option>
                    <Option value="admin" className="role-option">
                      <div className="role-option-content">
                        <CrownOutlined style={{ color: getRoleColor('admin') }} />
                        <span>אדמין</span>
                      </div>
                    </Option>
                  </Select>
                </Form.Item>
              )}
            />
          </div>
        </div>

        <Divider className="add-user-divider" />

        <div className="form-actions">
          <Button onClick={onClose} className="cancel-action-button">
            ביטול
          </Button>
          <Button type="primary" htmlType="submit" className="submit-action-button">
            הוסף משתמש
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;