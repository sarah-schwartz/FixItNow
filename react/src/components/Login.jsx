import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Layout, Card, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../services/axiosInstance';
const baseUrl = import.meta.env.VITE_API_BASE_URL;


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
      remember: true
    }
  });

  const onSubmit = async (data) => {
  setIsLoading(true);
  try {
    const response = await axios.post(
      `/auth/login`,
      {
        userName: data.username,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("response.data", response.data);

    
    navigate("/HomePage");
  } catch (err) {
    console.error("שגיאה בשליחה לשרת:", err);
  } finally {
    setIsLoading(false);
  }
};

  const handleGoogleLogin = async() => {
    window.location.href = "http://localhost:8080/auth/google";
}

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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>כניסה</h2>
          <p style={{ color: '#666' }}>ברוכים הבאים, אנא הכנס לחשבונך</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} dir="rtl">
          <div style={{ marginBottom: 24 }}>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'יש להזין שם משתמש' }}
              render={({ field }) => (
                <Form.Item validateStatus={errors.username ? 'error' : ''} help={errors.username?.message}>
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
              name="password"
              control={control}
              rules={{ required: 'יש להזין סיסמה' }}
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

          <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 24 }}>
            <Controller
              name="remember"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox checked={value} onChange={onChange}>
                  זכור אותי
                </Checkbox>
              )}
            />
            <Link to="/forgot-password" style={{ color: '#1890ff' }}>
              שכחת סיסמה?
            </Link>
          </Space>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%', height: '40px', marginBottom: 24 }}
            loading={isLoading}
          >
            כניסה
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
            אין לך חשבון?{' '}
            <Link to="/SignIn" style={{ color: '#1890ff' }}>
              הרשם עכשיו
            </Link>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default Login;