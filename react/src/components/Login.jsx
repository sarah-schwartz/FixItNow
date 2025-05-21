import "../css/Login.css";
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex,Layout } from 'antd';
import { updateName, updateRole } from "../Store/UserSlice";
import { useDispatch } from 'react-redux';
import { Link,useNavigate} from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm(); // מוסיפים את form instance
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSubmit = async (values) => {
    try {
      debugger
      const response = await fetch("http://localhost:8080/auth/login" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName: values.username, password: values.password })
      });

      const result = await response.json();
      console.log("התגובה מהשרת:", result);


    if (response.ok && result) {
      // כאן אפשר לפענח את הטוקן אם צריך או לשמור אותו
      localStorage.setItem("token", result.token);

      // if (result.password === values.password) {
      //   dispatch(updateName(result.name));
      //   dispatch(updateRole(result.role));
        navigate("/HomePage");
      } else {
        // קביעת שגיאה בשדה הסיסמה
        form.setFields([
          {
            name: 'password',
            errors: ['סיסמה שגויה. נסה שוב.'],
          },
        ]);
      }
      
    } catch (err) {
      console.error("שגיאה בשליחה לשרת:", err);
    }
  };

  const onFinish = (values) => {
    debugger
    console.log('Received values of form: ', values);
    handleSubmit(values);
  };

  return (
    <Layout
            style={{
                minHeight: '85vh',
                width: '100vw',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                margin: 0,
                background:'rgb(226, 226, 226)',
                justifyContent: 'center',
                flexDirection:'row',
                 flexWrap: 'wrap',
                alignContent: 'center'
            }}
        >

<div style={{ direction: 'rtl', textAlign: 'right',padding: '3%',backgroundColor:'white',width:'30vw',height:'60vh',borderRadius:'10px' }}>
      <Form
        form={form} // מחברים את ה־form instance
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <div className="loginFont">כניסה</div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'הכנס את שמך בבקשה!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="שם משתמש" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'הכנס סיסמא בבקשה!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="סיסמא" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>זכור אותי</Checkbox>
            </Form.Item>
            <a href="">שכחת סיסמא?</a>
          </Flex>
        </Form.Item>
            <Button
              style={{ width: '100%', marginTop: '1rem', backgroundColor: '#db4437', color: 'white',margin:'10px',height:'35px',left:'7px' }}
              onClick={() => {
                window.location.href = "http://localhost:8080/auth/google";
                }}>
                  כניסה עם Google
            </Button>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            כניסה
          </Button>
          או  
          <Link to={`/SignIn`} >
          {/* או <div>הרשם עכשיו</div> */}
        <a href="">  הרשם עכשיו</a>
          </Link>
          
        </Form.Item>
      </Form>
    </div>

        </Layout>
    
  );
};

export default Login;
