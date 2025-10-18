// components/HomePage.js
import { Row, Col, Layout, Spin, Typography } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react'; // useEffect מיובא אך לא בשימוש ישיר בקוד זה, אולי נדרש ללוגיקה אחרת שהסרת
// import { useSelector, useDispatch } from 'react-redux'; // אם אינך משתמש ב-Redux כאן, ניתן להסיר
import {
  ProfileOutlined,
  PlusCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../hooks/useCurrentUser';

const NavigationCard = lazy(() => import('./NavigationCard'));

const { Content } = Layout;
const baseUserCards = [
  
  {
    icon: <PlusCircleOutlined style={{ fontSize: '24px' }} />,
    title: 'הגשת בקשה',
    link: '/AddRequest',
    roles: ['developer', 'support', ]
  },
  {
    icon: <ProfileOutlined style={{ fontSize: '24px' }} />,
    title: 'הבקשות שלי',
    link: '/MyRequests',
    roles: ['developer', 'support']
  },
];

const roleSpecificCardsConfig = {
  support: [
    {
      icon: <SolutionOutlined style={{ fontSize: '24px' }} />,
      title:'ממתין לאישור',
      link: '/AssignedToMe'
    },
  ],
  admin: [
    {
      icon: <TeamOutlined style={{ fontSize: '24px' }} />,
      title: 'ניהול משתמשים',
      link: '/UserManagment'
    },
    {
      icon: <DatabaseOutlined style={{ fontSize: '24px' }} />,
      title: 'כל הפניות',
      link: '/AllRequests'
    }
  ],
  
};



const HomePage = () => {
  const navigate = useNavigate();
  const { user: currentUser, loading: userLoading, error: userError } = useCurrentUser();

  if (userLoading) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </Layout>
    );
  }

  if (userError || !currentUser) {
    if (window.location.pathname !== '/login') {
        navigate('/login');
    }
    return null; 
  }
  
  let cardsToShow = [];
  if (currentUser && currentUser.role) {
    cardsToShow = baseUserCards.filter(card => {
      const willShow = card.roles.includes(currentUser.role);
      return willShow;
    });

    if (roleSpecificCardsConfig[currentUser.role]) {
      cardsToShow = [...cardsToShow, ...roleSpecificCardsConfig[currentUser.role]];
    } 
   }
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
            margin: '0 auto 20px',
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
          }}
        >
          {cardsToShow.length > 0 ? (
            <Row
              gutter={[48, 48]}
              style={{
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}
            >
              {cardsToShow.map((item, index) => (
                <Col
                  key={item.link || index}
                  xs={24}
                  sm={12}
                  lg={cardsToShow.length > 3 ? 6 : 8}
                  style={{
                    display: 'flex',
                    minHeight: '320px',
                    animation: 'slideInUp 0.8s ease-out forwards',
                    animationDelay: `${index * 0.15}s`,
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
          ) : (
            <Typography.Text style={{ textAlign: 'center', display: 'block', fontSize: '16px', marginTop: '20px' }}>
              {userLoading ? 'טוען אפשרויות...' : 'לא נמצאו אפשרויות ניווט עבורך כרגע.'}
            </Typography.Text>
          )}
        </div>

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

      {/* הסרת Suspense מיותר שהיה כאן אם אינו בשימוש לפוטר או משהו דומה */}
      {/* <Suspense fallback={ ... }> ... </Suspense> */}

      <style >{`
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
           .content-padding { /* ודא שיש שימוש בקלאס זה אם הוא מוגדר */
             padding: 60px 16px 40px !important;
           }

           .title-responsive { /* ודא שיש שימוש בקלאס זה אם הוא מוגדר */
             font-size: 2.5rem !important;
           }

           .description-responsive { /* ודא שיש שימוש בקלאס זה אם הוא מוגדר */
             font-size: 1.1rem !important;
             padding: 0 16px;
           }
         }

         @media (max-width: 576px) {
           .cards-gutter { /* ודא שיש שימוש בקלאס זה אם הוא מוגדר */
             gap: 32px !important;
           }
         }
       `}</style>
    </Layout>
  );
};

export default HomePage;