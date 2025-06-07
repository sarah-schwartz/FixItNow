import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Layout, Alert, Spin, Row, Col, Divider, Badge, Space } from 'antd';
import { UserOutlined, MailOutlined, SafetyCertificateOutlined, LoadingOutlined } from '@ant-design/icons';

// // Mock axios instance - replace with your actual implementation
// const axios = {
//   get: async (url, config) => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // Simulate successful response
//     return {
//       data: {
//         userName: 'יוסי כהן',
//         email: 'yossi.cohen@example.com',
//         role: 'מנהל מערכת'
//       }
//     };
//   }
// };

const { Title, Text } = Typography;
const { Content } = Layout;

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        console.log('Fetching profile data...');

        const response = await axios.get('/auth/me', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Profile response:', response);

        setName(response.data.userName);
        setEmail(response.data.email);
        setRole(response.data.role);
        setError('');
      } catch (err) {
        console.error("שגיאה בשליפת נתוני פרופיל:", err);

        if (err.response?.status === 401) {
          setError('אנא התחבר מחדש למערכת');
        } else {
          setError('שגיאה בטעינת הפרופיל');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const customSpinIcon = <LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />;

  if (loading) {
    return (
      <Layout
        style={{
          minHeight: '100vh',
          background: 'transparent', // Changed to transparent
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />

        <Content style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          zIndex: 1
        }}>
          <Card
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: 'none',
              borderRadius: '24px',
              padding: '40px 20px',
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-10px)'
            }}
          >
            <Spin indicator={customSpinIcon} />
            <Title level={4} style={{ marginTop: 24, color: '#1890ff', fontWeight: '300' }}>
              טוען פרטי פרופיל...
            </Title>
          </Card>
        </Content>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout style={{
        minHeight: '100vh',
        background: 'transparent' // Changed to transparent
      }}>
        <Content style={{
          maxWidth: '600px',
          margin: 'auto',
          padding: '40px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Alert
            message="שגיאה במערכת"
            description={error}
            type="error"
            showIcon
            style={{
              borderRadius: '20px',
              border: 'none',
              boxShadow: '0 20px 40px rgba(255, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '24px'
            }}
          />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{
      minHeight: '100vh',
      background: 'transparent', // Changed to transparent
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Background Elements */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: '5%',
        width: '120px',
        height: '120px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '8%',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '2%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite'
      }} />

      <Content
        style={{
          maxWidth: '900px',
          margin: 'auto',
          padding: '40px 24px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header Card */}
        <Card
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: 'none',
            borderRadius: '24px',
            marginBottom: '24px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }}
        >
          {/* Header Background */}
          <div style={{
            background: 'linear-gradient(135deg, #1890ff, #722ed1)',
            margin: '-24px -24px 24px -24px',
            padding: '48px 24px',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '25px',
              height: '25px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '50%'
            }} />

            <Avatar
              size={120}
              icon={<UserOutlined />}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                marginBottom: '24px'
              }}
            />
            <Title level={2} style={{
              color: 'white',
              margin: 0,
              fontWeight: '300',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              שלום, {name}!
            </Title>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '16px',
              display: 'block',
              marginTop: '8px'
            }}>
              ברוך הבא לפרופיל האישי שלך
            </Text>
          </div>

          {/* Profile Details */}
          <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
            <Col xs={24} md={8}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                  border: 'none',
                  borderRadius: '16px',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="profile-info-card"
                hoverable
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Avatar
                    style={{
                      backgroundColor: '#1890ff',
                      marginBottom: '12px'
                    }}
                    icon={<UserOutlined />}
                  />
                  <Text type="secondary" style={{ fontSize: '12px', fontWeight: '500' }}>
                    שם מלא
                  </Text>
                  <Title level={4} style={{
                    margin: 0,
                    color: '#1890ff',
                    fontWeight: '600'
                  }}>
                    {name}
                  </Title>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                  border: 'none',
                  borderRadius: '16px',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="profile-info-card"
                hoverable
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Avatar
                    style={{
                      backgroundColor: '#52c41a',
                      marginBottom: '12px'
                    }}
                    icon={<MailOutlined />}
                  />
                  <Text type="secondary" style={{ fontSize: '12px', fontWeight: '500' }}>
                    כתובת אימייל
                  </Text>
                  <Title level={4} style={{
                    margin: 0,
                    color: '#52c41a',
                    fontWeight: '600',
                    wordBreak: 'break-word'
                  }}>
                    {email}
                  </Title>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)',
                  border: 'none',
                  borderRadius: '16px',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="profile-info-card"
                hoverable
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Badge count="VIP" style={{ backgroundColor: '#722ed1' }}>
                    <Avatar
                      style={{
                        backgroundColor: '#722ed1',
                        marginBottom: '12px'
                      }}
                      icon={<SafetyCertificateOutlined />}
                    />
                  </Badge>
                  <Text type="secondary" style={{ fontSize: '12px', fontWeight: '500' }}>
                    תפקיד במערכת
                  </Text>
                  <Title level={4} style={{
                    margin: 0,
                    color: '#722ed1',
                    fontWeight: '600'
                  }}>
                    {role}
                  </Title>
                </Space>
              </Card>
            </Col>
          </Row>

          <Divider style={{
            borderColor: '#f0f0f0',
            margin: '32px 0 16px 0'
          }} />

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '13px' }}>
              עודכן לאחרונה • {new Date().toLocaleDateString('he-IL')} • המערכת פעילה
            </Text>
          </div>
        </Card>
      </Content>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .profile-info-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
        }

        .ant-card-body {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default ProfilePage;