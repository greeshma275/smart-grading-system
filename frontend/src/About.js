import React from 'react';
import {
  FaEye,
  FaBrain,
  FaChartLine,
  FaComments,
  FaRocket,
  FaUsers,
  FaGraduationCap,
  FaHandPaper,
  FaCogs,
  FaAward,
  FaLightbulb,
  FaArrowRight
} from 'react-icons/fa';
import Header from './Header';
import learningImage from './assets/Learning-bro.png';

const About = ({ onNavigate, onLogout }) => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f6f0',
    fontFamily: 'Arial, sans-serif',
  };

  const sectionStyle = {
    padding: '60px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const heroStyle = {
    background: 'linear-gradient(135deg, #b07c6c 0%, #8b6b5c 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '100px 20px',
    position: 'relative',
    overflow: 'hidden',
  };

  const heroOverlay = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.1)',
    zIndex: 1,
  };

  const heroContent = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: '0 auto',
  };

  const stepCardStyle = {
    background: 'white',
    borderRadius: '15px',
    padding: '30px',
    margin: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '2px solid #e9e6d7',
    position: 'relative',
    overflow: 'hidden',
  };

  const stepIconStyle = {
    fontSize: '48px',
    color: '#b07c6c',
    marginBottom: '20px',
    display: 'block',
  };

  const featureGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px',
  };

  const teamStyle = {
    backgroundColor: '#e9e6d7',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    margin: '40px 0',
  };

  const ctaStyle = {
    background: 'linear-gradient(135deg, #b07c6c 0%, #8b6b5c 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '60px 20px',
    borderRadius: '20px',
    margin: '40px 0',
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: '#b07c6c',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '25px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px',
  };

  const processSteps = [
    {
      icon: <FaHandPaper />,
      title: "Handwritten Input",
      description: "Students submit their handwritten answer sheets through our secure upload system. Our platform accepts various image formats and ensures high-quality processing."
    },
    {
      icon: <FaEye />,
      title: "OCR Conversion",
      description: "Advanced Optical Character Recognition technology converts handwritten text to digital format with 95%+ accuracy, preserving the original meaning and context."
    },
    {
      icon: <FaCogs />,
      title: "Answer Processing",
      description: "Our intelligent system analyzes the converted text, identifies key concepts, and structures the answers for comprehensive evaluation."
    },
    {
      icon: <FaBrain />,
      title: "ML Model Grading",
      description: "State-of-the-art machine learning algorithms evaluate answers based on content accuracy, completeness, and relevance to provide fair and consistent grading."
    },
    {
      icon: <FaChartLine />,
      title: "Evaluation & Analysis",
      description: "Comprehensive performance analysis identifies strengths and areas for improvement, providing detailed insights into student understanding."
    },
    {
      icon: <FaComments />,
      title: "Feedback & Results",
      description: "Personalized feedback and detailed results help students understand their performance and guide their learning journey effectively."
    }
  ];

  return (
    <div style={containerStyle}>
      <Header onNavigate={onNavigate} onLogout={onLogout} />

      {/* Hero Section */}
      <section
        style={{
          ...heroStyle,
          background: `url(${require('./assets/about.jpeg')}) center/cover no-repeat`,
        }}
      >
        <div style={heroOverlay}></div>
        <div style={heroContent}>
          <FaGraduationCap size={80} style={{ marginBottom: '20px' }} />
          <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
            Smart Grading System
          </h1>
          <p style={{ fontSize: '24px', marginBottom: '30px', opacity: 0.9 }}>
            Revolutionizing Education Through AI-Powered Assessment
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.6', opacity: 0.8 }}>
            Transforming handwritten assessments into intelligent, fair, and comprehensive evaluations
          </p>
        </div>
      </section>


      {/* Mission Section */}
      <section style={sectionStyle}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1', minWidth: '400px' }}>
            <h2 style={{ fontSize: '36px', color: '#b07c6c', marginBottom: '20px' }}>
              <FaLightbulb style={{ marginRight: '15px' }} />
              Our Mission
            </h2>
            <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#666' }}>
              We believe every student deserves fair, consistent, and constructive feedback. Our mission is to eliminate
              bias in grading while providing educators with powerful tools to understand and support their students' learning journey.
            </p>
          </div>
          <div style={{
            flex: '0 0 350px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={learningImage}
              alt="Learning and Education"
              style={{
                width: '280px',
                height: '280px',
                objectFit: 'contain',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(176, 124, 108, 0.2)',
                transition: 'all 0.3s ease',
                border: '3px solid #e9e6d7',
                background: 'linear-gradient(145deg, #ffffff, #f8f6f0)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px) rotate(2deg)';
                e.target.style.boxShadow = '0 20px 40px rgba(176, 124, 108, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) rotate(0deg)';
                e.target.style.boxShadow = '0 15px 35px rgba(176, 124, 108, 0.2)';
              }}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: '36px', color: '#b07c6c', textAlign: 'center', marginBottom: '60px' }}>
          <FaRocket style={{ marginRight: '15px' }} />
          How Our System Works
        </h2>

        <div style={featureGridStyle}>
          {processSteps.map((step, index) => (
            <div
              key={index}
              style={{
                ...stepCardStyle,
                transition: 'all 0.3s ease', // smooth animation
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                e.currentTarget.style.backgroundColor = '#8fbc8f';

                const children = e.currentTarget.querySelectorAll('h3, p, svg');
                children.forEach((child) => {
                  if (child.tagName === 'SVG') {
                    child.style.color = '#fff';
                  } else {
                    child.style.color = '#fff';
                    child.style.fontWeight = 'bold';
                  }
                });
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                e.currentTarget.style.backgroundColor = 'white';

                const children = e.currentTarget.querySelectorAll('h3, p, svg');
                children.forEach((child) => {
                  if (child.tagName === 'SVG') {
                    child.style.color = '#b07c6c';
                  } else {
                    child.style.color = child.tagName === 'H3' ? '#b07c6c' : '#666';
                    child.style.fontWeight = 'normal';
                  }
                });
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '24px',
                  color: '#e9e6d7',
                  fontWeight: 'bold',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              <div style={stepIconStyle}>{step.icon}</div>
              <h3 style={{ fontSize: '24px', color: '#b07c6c', marginBottom: '15px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section style={{ padding: '50px 20px', backgroundColor: '#8fbc8f' }}>
        <div
          style={{
            borderRadius: '20px',
            backgroundColor: '#8fbc8f', // changed from beige to green
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '36px', color: '#fff', fontWeight: 'bold', marginBottom: '30px' }}>
            <FaAward style={{ marginRight: '15px', color: '#fff' }} />
            What Makes Us Unique
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginTop: '40px',
            }}
          >
            <div>
              <FaBrain size={40} color="#fff" style={{ marginBottom: '15px' }} />
              <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '10px' }}>AI-Powered Accuracy</h3>
              <p style={{ color: '#fff', fontWeight: 'bold' }}>
                Advanced machine learning ensures consistent and fair grading
              </p>
            </div>

            <div>
              <FaChartLine size={40} color="#fff" style={{ marginBottom: '15px' }} />
              <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '10px' }}>Detailed Analytics</h3>
              <p style={{ color: '#fff', fontWeight: 'bold' }}>
                Comprehensive insights into student performance and learning patterns
              </p>
            </div>

            <div>
              <FaUsers size={40} color="#fff" style={{ marginBottom: '15px' }} />
              <h3 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '10px' }}>Educator-Friendly</h3>
              <p style={{ color: '#fff', fontWeight: 'bold' }}>
                Designed by educators, for educators, with intuitive interfaces
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Our Story */}
      <section style={sectionStyle}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '50px',
            maxWidth: '1000px',
            margin: '0 auto',
            flexWrap: 'wrap',
          }}
        >
          {/* Image on the Left */}
          <div
            style={{
              flex: '1',
              minWidth: '300px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={require('./assets/Learning-pana.png')}
              alt="Our Story Illustration"
              style={{
                width: '280px',
                height: '280px',
                objectFit: 'contain',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(176, 124, 108, 0.2)',
                transition: 'all 0.3s ease',
                border: '3px solid #e9e6d7',
                background: 'linear-gradient(145deg, #ffffff, #f8f6f0)',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px) rotate(2deg)';
                e.target.style.boxShadow = '0 20px 40px rgba(176, 124, 108, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) rotate(0deg)';
                e.target.style.boxShadow = '0 15px 35px rgba(176, 124, 108, 0.2)';
              }}
            />
          </div>

          {/* Text on the Right */}
          <div style={{ flex: '2', minWidth: '300px' }}>
            <h2 style={{ fontSize: '36px', color: '#b07c6c', marginBottom: '30px' }}>
              Our Story
            </h2>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#666',
                marginBottom: '30px',
              }}
            >
              Born from the challenges faced by educators in providing timely and consistent feedback,
              our Smart Grading System represents years of research in artificial intelligence,
              machine learning, and educational technology.
            </p>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#666',
              }}
            >
              We've partnered with leading educational institutions to create a solution that not only
              saves time but enhances the quality of education through intelligent assessment and
              personalized feedback mechanisms.
            </p>
          </div>
        </div>
      </section>



    </div>
  );
};

export default About;
