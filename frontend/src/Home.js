import React from 'react';
import Header from './Header';
import heroImage from './assets/hero.jpeg'; // Import the hero image

const Home = ({ onNavigate, onLogout }) => {
  const handleGetStarted = () => {
    onNavigate('upload');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0ebe6' }}>
      <Header onNavigate={onNavigate} onLogout={onLogout} />
      
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >

        
        {/* Content Container */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '700px',
            padding: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f8f8f8';
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 16px 50px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
          }}
        >
          <h1
            style={{
              fontSize: '52px',
              fontWeight: '700',
              color: '#b07b69',
              marginBottom: '24px',
              lineHeight: '1.2',
            }}
          >
            Smart Grading Made Simple
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#8b6f47',
              marginBottom: '40px',
              lineHeight: '1.6',
            }}
          >
            Transform your grading process with AI-powered assessment tools that save time and provide consistent, accurate results.
          </p>
          
          <button
            onClick={handleGetStarted}
            style={{
              padding: '18px 36px',
              backgroundColor: '#b07b69',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 16px rgba(176, 123, 105, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#9d6b5d';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 20px rgba(176, 123, 105, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#b07b69';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 16px rgba(176, 123, 105, 0.4)';
            }}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          backgroundColor: '#f9f5f1',
          padding: '60px 60px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '32px',
            fontWeight: '600',
            color: '#b07b69',
            marginBottom: '40px',
          }}
        >
          Why Choose Smart Grading?
        </h2>
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {[
            { title: 'Fast & Accurate', desc: 'AI-powered grading delivers consistent results in seconds' },
            { title: 'Easy to Use', desc: 'Simple upload process with intuitive interface' },
            { title: 'Detailed Feedback', desc: 'Comprehensive analysis and improvement suggestions' }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                padding: '30px 20px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c8e6c8';
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
                // Change text colors on hover
                const h3 = e.target.querySelector('h3');
                const p = e.target.querySelector('p');
                if (h3) h3.style.color = 'white';
                if (p) p.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                // Reset text colors
                const h3 = e.target.querySelector('h3');
                const p = e.target.querySelector('p');
                if (h3) h3.style.color = '#b07b69';
                if (p) p.style.color = '#8b6f47';
              }}
            >
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#b07b69',
                  marginBottom: '15px',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: '16px',
                  color: '#8b6f47',
                  lineHeight: '1.5',
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
