import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const NavigationCard = ({ title, icon, link }) => {
  const navigate = useNavigate();

  const cleanIcon = React.cloneElement(icon, {
    style: {},
    className: ''
  });

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Card
        onClick={() => navigate(link)}
        className="navigation-card"
        hoverable
        style={{
          height: '100%',
          minHeight: '280px',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 50%, #ffffff 100%)',
          border: '1px solid rgba(22, 119, 255, 0.1)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(0, 33, 71, 0.06)',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          position: 'relative',
          backdropFilter: 'blur(10px)',
        }}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '48px 32px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 3,
          },
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'translateY(-12px) scale(1.03)';
          card.style.boxShadow = '0 20px 60px rgba(22, 119, 255, 0.15)';
          card.style.borderColor = 'rgba(22, 119, 255, 0.3)';
          const iconContainer = card.querySelector('.icon-container');
          if (iconContainer) {
            iconContainer.style.transform = 'scale(1.1) rotate(5deg)';
          }
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.transform = 'translateY(0) scale(1)';
          card.style.boxShadow = '0 8px 32px rgba(0, 33, 71, 0.06)';
          card.style.borderColor = 'rgba(22, 119, 255, 0.1)';
          const iconContainer = card.querySelector('.icon-container');
          if (iconContainer) {
            iconContainer.style.transform = 'scale(1) rotate(0deg)';
          }
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(22, 119, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 1,
            animation: 'float 6s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-20px',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(64, 169, 255, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 1,
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />
        <div className="icon-container" style={{
          fontSize: '4.5rem',
          marginBottom: '24px',
          color: '#1677ff',
          background: 'linear-gradient(135deg, #1677ff 0%, #40a9ff 50%, #1677ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 4px 12px rgba(22, 119, 255, 0.2))',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          zIndex: 2,
        }}>
          {cleanIcon}
        </div>
        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: 700,
          margin: 0,
          lineHeight: 1.3,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.5px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          {title}
        </h3>
        <div className="hover-indicator" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #1677ff 0%, #40a9ff 50%, #1677ff 100%)',
          transform: 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '0 0 24px 24px',
        }} />
        <div className="glow-effect" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(22, 119, 255, 0.05) 0%, transparent 50%, rgba(64, 169, 255, 0.05) 100%)',
          opacity: 0,
          transition: 'opacity 0.4s ease',
          borderRadius: '24px',
          zIndex: 1,
        }} />
      </Card>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        .navigation-card:hover .hover-indicator {
          transform: scaleX(1);
        }

        .navigation-card:hover .glow-effect {
          opacity: 1;
        }

        .navigation-card:active {
          transform: translateY(-8px) scale(0.98) !important;
        }

        @media (max-width: 768px) {
          .navigation-card {
            min-height: 240px !important;
          }

          .icon-container {
            font-size: 3.5rem !important;
            margin-bottom: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NavigationCard;
