// import React, { lazy, Suspense } from 'react';
// import { Card, Row, Col, Layout, Button } from 'antd';
// import {
//     ProfileOutlined,
//     PlusCircleOutlined,
//     ClockCircleOutlined,
//     LeftOutlined,
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const Header = lazy(() => import('./Header'));
// const Footer = lazy(() => import('./Footer'));

// const { Content } = Layout;

// const cardData = [
//     {
//         icon: <ProfileOutlined style={{ fontSize: '3.5rem', color: '#1677ff' }} />,
//         title: 'הבקשות שלי',
//         link: '/MyRequests'
//     },
//     {
//         icon: <PlusCircleOutlined style={{ fontSize: '3.5rem', color: '#1677ff' }} />,
//         title: 'הגשת בקשה',
//         link: '/AddRequest'
//     },
//     {
//         icon: <ClockCircleOutlined style={{ fontSize: '3.5rem', color: '#1677ff' }} />,
//         title: 'ממתין לאישור',
//         link: '/pending-approvals'
//     },
// ];

// const HomePage = () => {
//     const navigate = useNavigate();
//     return (
//         <Layout
//             style={{
//                 minHeight: '85vh',
//                 width: '100vw',
//                 padding: 0,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 overflow: 'hidden',
//                 margin: 0,
//                 background:'rgb(226, 226, 226)',
//             }}
//         >
//             {/* <Header /> */}
//             <Content
//                 style={{
//                     flex: '1 0 auto',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     width: '100%',
//                     padding: '24px',
//                     margin: 0
//                 }}
//             >
//                 <Row
//                     gutter={[30, 30]}
//                     style={{
//                         width: '100%',
//                         margin: 0,
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'stretch',
//                         padding: 0
//                     }}
//                 >
//                     {cardData.map((item, index) => (
//                         <Col
//                             key={index}
//                             xs={24}
//                             sm={12}
//                             lg={8}
//                             style={{
//                                 display: 'flex',
//                                 padding: '12px'
//                             }}
//                         >
//                             <Card
//                                 hoverable
//                                 onClick={() => navigate(item.link)}
//                                 style={{
//                                     textAlign: 'center',
//                                     borderRadius: '12px',
//                                     position: 'relative',
//                                     cursor: 'pointer',
//                                     transition: 'all 0.3s ease',
//                                     width: '100%',
//                                     height: '36vh',
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     justifyContent: 'center',
//                                     // borderColor:' #1677ff',
//                                     // borderStyle:'5rem',
//                                }}
//                             >
//                                 <div style={{
//                                     fontSize: '54px', 
//                                     marginBottom: '24px'
//                                 }}>
//                                     {item.icon}
//                                 </div>
//                                 <h3 style={{
//                                     fontSize: '24px', 
//                                     margin: 0
//                                 }}>
//                                     {item.title}
//                                 </h3>
//                                 {/* <Button
//                                     type="primary"
//                                     shape="circle"
//                                     icon={}
//                                     style={{
//                                         position: 'absolute',
//                                         left: '16px',
//                                         top: '50%',
//                                         transform: 'translateY(-50%)',
//                                         width: '2.7rem',
//                                         height: '2.7rem',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         background:'none'
//                                     }}
//                                 /> */}
//                                 {/* <LeftOutlined style={{ fontSize: '1rem',color:'#1677ff',position:'absolute',left:'1vw' ,bottom:'17vh'}} /> */}
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             </Content>
//             <Footer />
//         </Layout>
//     );
// };

// export default HomePage;



import { Row, Col, Layout, Spin, Typography } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ProfileOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { updateUser } from '../Store/UserSlice';

const NavigationCard = lazy(() => import('./NavigationCard'));

const { Content } = Layout;
const { Title } = Typography;

const cardData = [
  {
    icon: <ProfileOutlined />,
    title: 'הבקשות שלי',
    link: '/MyRequests'
  },
  {
    icon: <PlusCircleOutlined />,
    title: 'הגשת בקשה',
    link: '/AddRequest'
  },
  {
    icon: <ClockCircleOutlined />,
    title: 'ממתין לאישור',
    link: '/pending-approvals'
  },
];

const parseJwt = (token) => {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        const decoded = parseJwt(token);

        try {
          const response = await axios.get("http://localhost:8080/User/getUserbyId/" + decoded.id);
          const user = response.data;
          dispatch(updateUser({ name: user.userName, role: user.role }));
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [dispatch]);

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
        background: 'rgb(226, 226, 226)',
      }}
    >
      <Content
        style={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '80px 24px 60px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '120px',
            height: '4px',
            background: 'linear-gradient(90deg, #1677ff, #40a9ff)',
            margin: '0 auto',
            borderRadius: '2px',
            opacity: 0.8,
          }}
        />

        {/* Cards container */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            position: 'relative',
            marginTop: '40px'
          }}
        >
          <Row
            gutter={[48, 48]}
            style={{
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            {cardData.map((item, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                lg={8}
                style={{
                  display: 'flex',
                  minHeight: '320px',
                  animation: 'slideInUp 0.8s ease-out forwards',
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                }}
              >
                <Suspense
                  fallback={
                    <div style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '280px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
                      borderRadius: '24px',
                      boxShadow: '0 8px 32px rgba(0, 33, 71, 0.06)',
                      border: '1px solid rgba(22, 119, 255, 0.1)',
                    }}>
                      <Spin size="large" />
                    </div>
                  }
                >
                  <NavigationCard
                    icon={item.icon}
                    title={item.title}
                    link={item.link}
                  />
                </Suspense>
              </Col>
            ))}
          </Row>
        </div>

        {/* Bottom line */}
        <div
          style={{
            marginTop: '80px',
            width: '400px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(22, 119, 255, 0.3), transparent)',
            borderRadius: '1px',
          }}
        />
      </Content>

      {/* Optional Suspense (לא חובה כאן, אבל נשאר אם תוסיפי רכיב עתידי) */}
      <Suspense fallback={
        <div style={{
          height: '10vh',
          background: '#f0f2f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Spin />
        </div>
      }>
        {/* רכיבים נוספים נטענים כאן אם צריך */}
      </Suspense>

      {/* אנימציות ו־CSS מדיה */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .content-padding {
            padding: 60px 16px 40px !important;
          }

          .title-responsive {
            font-size: 2.5rem !important;
          }

          .description-responsive {
            font-size: 1.1rem !important;
            padding: 0 16px;
          }
        }

        @media (max-width: 576px) {
          .cards-gutter {
            gap: 32px !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;
