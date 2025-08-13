import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaReact, FaNodeJs } from 'react-icons/fa';

const footerStyle = {
  background: '#b07c6c', // match header
  color: '#b07c6c',
  
  marginTop: 48,
  boxShadow: '0 -4px 24px #e9e6d7',
  borderTop: '2px solid #b07c6c22',
};

const iconStyle = {
  margin: '0 16px',
  color: '#e9e6d7',
  verticalAlign: 'middle',
  transition: 'transform 0.2s',
  filter: 'drop-shadow(0 2px 6px #b0c4bb88)',
};


const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '0 32px',
};

const Footer = () => (
  <footer style={footerStyle}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      minHeight: 60,
      fontWeight: 400,
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub style={iconStyle} size={28} /></a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin style={iconStyle} size={28} /></a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter style={iconStyle} size={28} /></a>
      </div>
      <div style={{ fontSize: 15, letterSpacing: 0.1, color: '#e9e6d7', textAlign: 'center', flex: 1 }}>
        &copy; {new Date().getFullYear()} <span style={{ fontWeight: 600 }}>Smart Grading System</span>. All rights reserved.
      </div>
  <div style={{ fontSize: 14, color: '#e9e6d7', display: 'flex', alignItems: 'center', gap: 8, textAlign: 'right' }}>
        Built with
        <span style={{
          background: '#e9e6d7',
          color: '#b07c6c',
          borderRadius: 4,
          padding: '2px 8px',
          fontWeight: 600,
          fontSize: 13,
          marginLeft: 4,
          marginRight: 2,
          letterSpacing: 0.5,
          border: '1px solid #e9e6d7',
        }}>React</span>,
        <span style={{
          background: '#e9e6d7',
          color: '#b07c6c',
          borderRadius: 4,
          padding: '2px 8px',
          fontWeight: 600,
          fontSize: 13,
          marginLeft: 4,
          marginRight: 2,
          letterSpacing: 0.5,
          border: '1px solid #e9e6d7',
        }}>Node.js</span>,
        <span style={{
          background: '#e9e6d7',
          color: '#b07c6c',
          borderRadius: 4,
          padding: '2px 8px',
          fontWeight: 600,
          fontSize: 13,
          marginLeft: 4,
          marginRight: 2,
          letterSpacing: 0.5,
          border: '1px solid #e9e6d7',
        }}>Express</span>,
        <span style={{
          background: '#e9e6d7',
          color: '#b07c6c',
          borderRadius: 4,
          padding: '2px 8px',
          fontWeight: 600,
          fontSize: 13,
          marginLeft: 4,
          marginRight: 2,
          letterSpacing: 0.5,
          border: '1px solid #e9e6d7',
        }}>MongoDB</span>
      </div>
    </div>
  </footer>
);

export default Footer;
