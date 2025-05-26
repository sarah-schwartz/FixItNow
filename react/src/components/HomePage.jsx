import React, { lazy, Suspense } from 'react';
import { Row, Col, Layout, Spin, Typography } from 'antd';
import {
  ProfileOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const NavigationCard = lazy(() => import('./NavigationCard'));

const { Content } = Layout;
const { Title } = Typography;

// Fixed: Remove inline styles from icons to prevent conversion errors
const cardData = [
  {
    icon: <ProfileOutlined />, // Clean icon without styles
    title: 'הבקשות שלי',
    link: '/MyRequests'
  },
  {
    icon: <PlusCircleOutlined />, // Clean icon without styles
    title: 'הגשת בקשה',
    link: '/AddRequest'
  },
  {
    icon: <ClockCircleOutlined />, // Clean icon without styles
    title: 'ממתין לאישור',
    link: '/pending-approvals'
  },
];

function HomePage() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f2ff 50%, #f5f8fc 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Global background decorations */}
      <div
        style={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(22, 119, 255, 0.08), transparent 60%)',
          borderRadius: '50%',
          zIndex: 1,
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '15%',
          right: '8%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(64, 169, 255, 0.06), transparent 60%)',
          borderRadius: '50%',
          zIndex: 1,
          animation: 'float 25s ease-in-out infinite reverse',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: '3%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(22, 119, 255, 0.04), transparent 60%)',
          borderRadius: '50%',
          zIndex: 1,
          animation: 'float 30s ease-in-out infinite',
        }}
      />

      <Suspense fallback={
        <div style={{ 
          height: '15vh', 
          background: 'linear-gradient(135deg, #001529 0%, #003a70 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Spin size="large" style={{ color: 'white' }} />
        </div>
      }>
      
      </Suspense>
     
      <Content
        style={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '80px 24px 60px',
          margin: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header section with enhanced styling */}
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            marginBottom: '60px',
            textAlign: 'center',
            position: 'relative',
          }}
          dir="rtl"
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
        </div>
       
        {/* Cards container with enhanced grid */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            position: 'relative',
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
                  animationDelay: `${index * 0.2}s`,
                  animation: 'slideInUp 0.8s ease-out forwards',
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

        {/* Bottom decorative element */}
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
      </Suspense>
      
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
}

export default HomePage;