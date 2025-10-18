// import React from 'react';
// import { Layout, Divider } from 'antd';
// import { HeartFilled, CopyrightOutlined } from '@ant-design/icons';

// const { Footer: AntFooter } = Layout;

// function Footer() {
//   const currentYear = new Date().getFullYear();
  
//   return (
//     <AntFooter
//       style={{
//         background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f2f5 100%)',
//         padding: '32px 50px 24px',
//         borderTop: '1px solid rgba(22, 119, 255, 0.1)',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Background decoration */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: '50%',
//           transform: 'translateX(-50%)',
//           width: '200px',
//           height: '2px',
//           background: 'linear-gradient(90deg, transparent, #1677ff40, transparent)',
//         }}
//       />
      
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: '16px',
//           position: 'relative',
//           zIndex: 2,
//         }}
//         dir="rtl"
//       >
//         {/* Main copyright text */}
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             fontSize: '1rem',
//             color: '#1a1a1a',
//             fontWeight: 500,
//           }}
//         >
//           <CopyrightOutlined 
//             style={{ 
//               color: '#1677ff',
//               fontSize: '1.1rem'
//             }} 
//           />
//           <span>{currentYear} כל הזכויות שמורות</span>
//         </div>
        
//         {/* Decorative divider */}
//         <div
//           style={{
//             width: '60px',
//             height: '1px',
//             background: 'linear-gradient(90deg, transparent, #1677ff60, transparent)',
//           }}
//         />
        
//         {/* Made with love text */}
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '6px',
//             fontSize: '0.9rem',
//             color: 'rgba(26, 26, 26, 0.7)',
//             fontWeight: 400,
//           }}
//         >
//           <span>נוצר באהבה</span>
//           <HeartFilled 
//             style={{ 
//               color: '#ff4d4f',
//               animation: 'heartbeat 2s ease-in-out infinite',
//               fontSize: '0.9rem'
//             }} 
//           />
//         </div>
        
//         {/* Additional info */}
//         <div
//           style={{
//             fontSize: '0.85rem',
//             color: 'rgba(26, 26, 26, 0.5)',
//             textAlign: 'center',
//             lineHeight: 1.4,
//             maxWidth: '400px',
//           }}
//         >
//           מערכת ניהול בקשות מתקדמת ובטוחה
//         </div>
//       </div>
      
//       {/* Background decorative elements */}
//       <div
//         style={{
//           position: 'absolute',
//           bottom: '-20px',
//           right: '10%',
//           width: '40px',
//           height: '40px',
//           background: 'radial-gradient(circle, rgba(22, 119, 255, 0.1), transparent)',
//           borderRadius: '50%',
//           zIndex: 1,
//         }}
//       />
      
//       <div
//         style={{
//           position: 'absolute',
//           bottom: '-15px',
//           left: '15%',
//           width: '30px',
//           height: '30px',
//           background: 'radial-gradient(circle, rgba(64, 169, 255, 0.08), transparent)',
//           borderRadius: '50%',
//           zIndex: 1,
//         }}
//       />
      
//       <style jsx>{`
//         @keyframes heartbeat {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.1); }
//         }
        
//         @media (max-width: 768px) {
//           .footer-content {
//             padding: 24px 20px 20px !important;
//           }
//         }
//       `}</style>
//     </AntFooter>
//   );
// }

// export default Footer;