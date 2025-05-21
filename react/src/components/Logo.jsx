// import React from 'react';
// import { ToolOutlined } from '@ant-design/icons';

// const Logo = () => {
//   return (
//     <div className="logo-container" style={{
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//       color: 'white',
//       fontSize: '24px',
//       fontWeight: 'bold',
//     }}>
//       <ToolOutlined style={{
//         fontSize: '28px',
//         color: '#1677ff',
//         transform: 'rotate(-45deg)',
//       }} />
//       <span style={{
//         background: 'linear-gradient(45deg, #1677ff, #69c0ff)',
//         WebkitBackgroundClip: 'text',
//         WebkitTextFillColor: 'transparent',
//         textShadow: '0px 0px 10px rgba(22, 119, 255, 0.3)',
//       }}>
//         FIX IT NOW
//       </span>
//     </div>
//   );
// };

// export default Logo;

// Logo.jsx
// import React from 'react';
// import { ThunderboltOutlined } from '@ant-design/icons';
// const Logo = () => {
//   return (
//     <div className="modern-animated-logo" style={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: '12px',
//         color: 'white',
//         fontSize: '24px',
//         fontWeight: '800',
//         cursor: 'pointer',
//       }}>
//         <div className="logo-icon-container" style={{
//           background: 'linear-gradient(45deg, #1677ff, #69c0ff)',
//           borderRadius: '12px',
//           padding: '8px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           transition: 'all 0.3s ease',
//         }}>
//           <ThunderboltOutlined className="thunder-icon" style={{
//             fontSize: '24px',
//             color: 'white',
//           }} />
//         </div>
//         <div className="logo-text" style={{
//           display: 'flex',
//           flexDirection: 'column',
//           lineHeight: '1',
//         }}>
//           <span className="fix-it-text" style={{
//             fontSize: '28px',
//             letterSpacing: '1px',
//             background: 'linear-gradient(45deg, #1677ff, #69c0ff)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             textShadow: '0px 0px 10px rgba(22, 119, 255, 0.3)',
//           }}>
//             FIX IT
//           </span>
//           <span className="now-text" style={{
//             fontSize: '18px',
//             background: 'linear-gradient(45deg, #69c0ff, #1677ff)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             fontWeight: '600',
//             letterSpacing: '2px',
//           }}>
//             NOW
//           </span>
//         </div>
//       </div>
//   );
// };

// export default Logo;

import React from 'react';
import { ThunderboltOutlined } from '@ant-design/icons';

const Logo = () => {
  return (
    <div className="modern-animated-logo" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      color: 'white',
      fontSize: '24px',
      fontWeight: '800',
      cursor: 'pointer',
      padding: '10px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="logo-icon-container" style={{
        background: 'linear-gradient(135deg, #1677ff 0%, #69c0ff 100%)',
        borderRadius: '15px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s ease',
        boxShadow: '0 4px 15px rgba(22, 119, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <ThunderboltOutlined className="thunder-icon" style={{
          fontSize: '28px',
          color: 'white',
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
          zIndex: 2,
        }} />
        <div className="icon-glow" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }} />
      </div>
      <div className="logo-text" style={{
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1.1',
        position: 'relative',
      }}>
        <span className="fix-it-text" style={{
          fontSize: '32px',
          letterSpacing: '2px',
          background: 'linear-gradient(135deg, #ffffff 0%, #69c0ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 15px rgba(22, 119, 255, 0.4)',
          fontFamily: "'Orbitron', sans-serif",
          transform: 'translateZ(0)',
        }}>
          FIX IT
        </span>
        <span className="now-text" style={{
          fontSize: '20px',
          background: 'linear-gradient(135deg, #69c0ff 0%, #ffffff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '600',
          letterSpacing: '4px',
          marginTop: '2px',
          fontFamily: "'Orbitron', sans-serif",
          transform: 'translateZ(0)',
        }}>
          NOW
        </span>
      </div>
    </div>
  );
};

export default Logo;