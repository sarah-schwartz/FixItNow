import "../css/Login.css";
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select,Layout } from 'antd';
import { Link,useNavigate} from 'react-router-dom';

const { Option } = Select;

const SignIn = () => {
  const [form] = Form.useForm();
  const navigate=useNavigate();

  const handleSubmit = async (values) => {
    debugger
    try {
      const { confirm, ...cleanedValues } = values;
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cleanedValues)
      });

      const result = await response.json();
      console.log("התגובה מהשרת:", result);
      debugger
      navigate("/HomePage");
    } catch (err) {
      console.error("שגיאה בשליחה לשרת:", err);
    }
  };

  const onFinish = values => {
    console.log('הנתונים שנשלחו:', values);
    handleSubmit(values); // פה הקריאה לשרת
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
      <div style={{ direction: 'rtl', textAlign: 'right' ,padding: '3%',backgroundColor:'white',width:'30vw',height:'70vh',borderRadius:'10px' }}>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 360 }}
        scrollToFirstError
      ><div className="loginFont">הרשמה</div>
        <Form.Item
          name="userName"
          rules={[{ required: true, message: 'יש להזין שם משתמש' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="שם משתמש" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'יש להזין סיסמה' }]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="סיסמה" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'יש לאשר את הסיסמה' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('הסיסמאות אינן תואמות'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="אימות סיסמה" />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: 'יש לבחור מין' }]}
        >
          <Select
            placeholder="תפקיד"
            className="rtl-select"
            dropdownStyle={{ direction: 'rtl', textAlign: 'right' }}
          >
            <Option value="developer">מפתח</Option>
            <Option value="support">תומך</Option>
            <Option value="admin">אדמין</Option>
          </Select>
        </Form.Item>
        <Button
          style={{ width: '100%', marginTop: '1rem', backgroundColor: '#db4437', color: 'white',margin:'10px',height:'35px',left:'7px' }}
          onClick={() => {
          window.location.href = "http://localhost:8080/auth/google";
          }}
              >
              התחברות עם Google
        </Button>


        <Form.Item>
          <Button style={{padding:'5px'}} type="primary" htmlType="submit" block > 
            הרשמה
          </Button>
          כבר רשום?  
          <Link to={`/Login`}>
          <a href="">התחבר עכשיו</a>
          </Link>
          
        </Form.Item>
      </Form>
    </div>
        </Layout>

    
  );
};

export default SignIn;





