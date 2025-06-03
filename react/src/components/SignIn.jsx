import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Layout, Card, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, MailOutlined, RollbackOutlined, SelectOutlined, TeamOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../services/axiosInstance';
const { Option } = Select;

const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
      password: '',
      email: '',
      confirm: '',
    }
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { confirm, ...cleanedValues } = data;
      const response = await axios.post(`/auth/register`, cleanedValues, {
        withCredentials: true
      });
      debugger
      if (response.status === 200) {
    await axios.post("/Email/send-email", {
      to:`${data.email}` ,
      subject: "משתמש התחבר למערכת",
      text: `המשתמש ${data.userName} התחבר בהצלחה.`,
    });

        navigate("/HomePage");
      } else {
        throw new Error('ההרשמה נכשלה');
      }
    } catch (err) {
      console.error("שגיאה בשליחה לשרת:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    debugger
    window.location.href =  "http://localhost:8080/auth/google";
  };

  return (
    <Layout style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Card style={{
        width: 400,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '12px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>הרשמה</h2>
          <p style={{ color: '#666' }}>צור חשבון חדש</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} dir="rtl">
          <div style={{ marginBottom: 24 }}>
            <Controller
              name="userName"
              control={control}
              rules={{ required: 'יש להזין שם משתמש' }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.userName ? 'error' : ''} help={errors.userName?.message}>
                  <Input
                    {...field}
                    prefix={<UserOutlined />}
                    placeholder="שם משתמש"
                    size="large"
                  />
                </Form.Item>
              )}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'יש להזין מייל',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'כתובת מייל לא תקינה'
                }
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.email ? 'error' : ''}
                  help={errors.email?.message}
                >
                  <Input
                    {...field}
                    prefix={<MailOutlined />}
                    placeholder="מייל"
                    size="large"
                  />
                </Form.Item>
              )}
            />
          </div>


          <div style={{ marginBottom: 24 }}>
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
                <Form.Item validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined />}
                    placeholder="סיסמה"
                    size="large"
                  />
                </Form.Item>
              )}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Controller
              name="confirm"
              control={control}
              rules={{
                required: 'יש לאשר את הסיסמה',
                validate: value => value === password || 'הסיסמאות אינן תואמות'
              }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.confirm ? 'error' : ''} help={errors.confirm?.message}>
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined />}
                    placeholder="אימות סיסמה"
                    size="large"
                  />
                </Form.Item>
              )}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Controller
              name="role"
              control={control}
              rules={{ required: 'יש לבחור תפקיד' }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.role ? 'error' : ''} help={errors.role?.message}>
                  <Select
                    {...field}
                    placeholder="תפקיד"
                    prefix={<TeamOutlined />}
                    size="large"
                    style={{ textAlign: 'right' }}
                  //allowClear
                  >
                    <Option value="developer">מפתח</Option>
                    <Option value="support">תומך</Option>
                    <Option value="admin">אדמין</Option>
                  </Select>
                </Form.Item>
              )}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%', height: '40px', marginBottom: 24 }}
            loading={isLoading}
          >
            הרשמה
          </Button>

          <Divider>או</Divider>

          <Button
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              height: '40px',
              background: '#fff',
              borderColor: '#d9d9d9',
              marginBottom: 24
            }}
          >
            התחברות עם Google
          </Button>

          <div style={{ textAlign: 'center' }}>
            כבר רשום?{' '}
            <Link to="/login" style={{ color: '#1890ff' }}>
              התחבר עכשיו
            </Link>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default SignIn;