import React, { useState } from 'react';
import LoginRegister from './LoginRegister';
import Home from './Home';
import Upload from './Upload';
import About from './About';
import Footer from './Footer';
import StudentDashboard from './StudentDashboard';
import UploadSchema from './UploadSchema';
import TeacherCourses from './TeacherCourses';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);   // store logged-in user with role
    setCurrentPage('home'); // default after login
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const renderCurrentPage = () => {
    if (!currentUser) {
      return <LoginRegister onLogin={handleLogin} />;
    }

    // ✅ If Teacher logs in
    if (currentUser.role === 'teacher') {
      switch (currentPage) {
        case 'home':
          return <Home onNavigate={handleNavigation} onLogout={handleLogout} />;
        case 'courses':
          return <TeacherCourses onNavigate={handleNavigation} onLogout={handleLogout} user={currentUser} />;
        case 'upload':
          return <Upload onNavigate={handleNavigation} onLogout={handleLogout} />;
        case 'uploadSchema':
          return <UploadSchema onNavigate={handleNavigation} onLogout={handleLogout} />;
        case 'about':
          return <About onNavigate={handleNavigation} onLogout={handleLogout} />;
        default:
          return <Home onNavigate={handleNavigation} onLogout={handleLogout} />;
      }
    }

    // ✅ If Student logs in
    if (currentUser.role === 'student') {
      return <StudentDashboard user={currentUser} onLogout={handleLogout} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        {renderCurrentPage()}
      </div>
      <Footer />
    </div>
  );
}

export default App;
