
import React, { useState } from 'react';
import LoginRegister from './LoginRegister';
import Home from './Home';
import Upload from './Upload';
import About from './About';
import Footer from './Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    // Show logout success message
    alert('Logged out successfully!');
    
    // Reset state and redirect to login
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginRegister onLogin={handleLogin} />;
      case 'home':
        return <Home onNavigate={handleNavigation} onLogout={handleLogout} />;
      case 'upload':
        return <Upload onNavigate={handleNavigation} onLogout={handleLogout} />;
      case 'about':
        return <About onNavigate={handleNavigation} onLogout={handleLogout} />;
      default:
        return <LoginRegister onLogin={handleLogin} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentPage === 'login' ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {renderCurrentPage()}
        </div>
      ) : (
        <div style={{ flex: 1 }}>
          {renderCurrentPage()}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
