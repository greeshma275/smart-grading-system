import React, { useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 32px',
  background: '#e9e6d7', // palette beige
  color: '#b07c6c',
  height: 64,
  boxShadow: '0 2px 12px #e9e6d7',
  borderBottom: '2px solid #b07c6c22',
};

const navLinks = {
  display: 'flex',
  gap: 24,
  alignItems: 'center',
  fontSize: 21,
  fontWeight: 900,
};

const Header = ({ onNavigate, onLogout }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navLinkStyle = (isHovered) => ({
    color: '#b07c6c',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: 6,
    transition: 'all 0.3s ease',
    position: 'relative',
    backgroundColor: isHovered ? '#b07b69' : 'transparent',
    color: isHovered ? 'white' : '#b07c6c',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
  });

  const tooltipStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#b07b69',
    color: 'white',
    padding: '6px 10px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    marginTop: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
  };

  const handleNavClick = (itemName) => {
    switch (itemName) {
      case 'Home':
        if (onNavigate) onNavigate('home');
        break;
      case 'Upload':
        if (onNavigate) onNavigate('upload');
        break;
      case 'Logout':
        if (onLogout) onLogout();
        break;
      case 'About':
        if (onNavigate) onNavigate('about');
        break;
      default:
        break;
    }
  };

  const navItems = [
    { name: 'Home', tooltip: 'Go to Home Page' },
    { name: 'About', tooltip: 'Learn About Us' },
    { name: 'Upload', tooltip: 'Upload Documents' },
    { name: 'Logout', tooltip: 'Sign Out' }
  ];

  return (
    <header style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <FaGraduationCap size={32} color="#b07c6c" />
        <span style={{ fontWeight: 750, fontSize: 26, color: '#b07c6c' }}>Smart Grading System</span>
      </div>
      <nav style={navLinks}>
        {navItems.map((item, index) => (
          <div
            key={item.name}
            style={{ position: 'relative' }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <a
              href="#"
              style={navLinkStyle(hoveredItem === index)}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.name);
              }}
            >
              {item.name}
            </a>
            {hoveredItem === index && (
              <div style={tooltipStyle}>
                {item.tooltip}
              </div>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
