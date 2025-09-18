import React, { useState } from 'react';
import {
  FaUpload,
  FaFileAlt,
  FaRocket,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaEye,
  FaBrain,
  FaChartLine,
  FaArrowRight,
  FaFileImage,
  FaFilePdf,
  FaFileWord
} from 'react-icons/fa';
import Header from './Header';
import uploadImage from './assets/upload.jpeg';

const Upload = ({ onNavigate, onLogout }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      setCurrentStep(2);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setCurrentStep(2);
    }
  };

  const handleSubmit = async () => {
  if (uploadedFile) {
    setIsProcessing(true);
    setCurrentStep(3);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setIsProcessing(false);
      setCurrentStep(4);

      if (data.extractedText) {
        alert("Grading completed! Text extracted ✅");

        // Download extracted text as file
        const blob = new Blob([data.extractedText], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${uploadedFile.name}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert("No text found in file.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error processing file");
      setIsProcessing(false);
    }
  }
};


  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FaFilePdf size={24} color="#e74c3c" />;
      case 'doc':
      case 'docx':
        return <FaFileWord size={24} color="#2980b9" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FaFileImage size={24} color="#27ae60" />;
      default:
        return <FaFileAlt size={24} color="#7f8c8d" />;
    }
  };

  const steps = [
    {
      number: 1,
      title: "Upload Document",
      description: "Select your handwritten assignment or exam paper",
      icon: <FaUpload />,
      active: currentStep >= 1
    },
    {
      number: 2,
      title: "OCR Processing",
      description: "AI converts handwriting to digital text",
      icon: <FaEye />,
      active: currentStep >= 2
    },
    {
      number: 3,
      title: "AI Analysis",
      description: "Machine learning evaluates content and accuracy",
      icon: <FaBrain />,
      active: currentStep >= 3
    },
    {
      number: 4,
      title: "Results & Feedback",
      description: "Get detailed grades and personalized feedback",
      icon: <FaChartLine />,
      active: currentStep >= 4
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f6f0' }}>
      <Header onNavigate={onNavigate} onLogout={onLogout} />


      <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', color: '#b07c6c', textAlign: 'center', marginBottom: '50px', fontWeight: 'bold' }}>
          Upload Your Document
        </h1>

        {/* Upload Area */}
        <div
          style={{
            background: 'white',
            borderRadius: '25px',
            padding: '50px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            border: '3px solid #e9e6d7',
            marginBottom: '50px'
          }}
        >
          <div
            style={{
              border: `3px dashed ${dragActive ? '#8fbc8f' : uploadedFile ? '#8fbc8f' : '#b07c6c'}`,
              borderRadius: '20px',
              padding: '60px 40px',
              textAlign: 'center',
              backgroundColor: dragActive ? '#f0fff0' : uploadedFile ? '#f0fff0' : '#fafafa',
              transition: 'all 0.3s ease',
              marginBottom: '30px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />

            {uploadedFile ? (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px', color: '#8fbc8f' }}>
                  {getFileIcon(uploadedFile.name)}
                </div>
                <h3 style={{ fontSize: '24px', color: '#8fbc8f', marginBottom: '10px', fontWeight: 'bold' }}>
                  ✓ File Ready: {uploadedFile.name}
                </h3>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
                  Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#8fbc8f',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  <FaCheckCircle style={{ marginRight: '8px' }} />
                  Ready to Process
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={uploadImage}
                  alt="Upload"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    marginBottom: '20px',
                    borderRadius: '10px'
                  }}
                />
                <h3 style={{ fontSize: '24px', color: '#b07c6c', marginBottom: '15px', fontWeight: 'bold' }}>
                  Drag & Drop Your File Here
                </h3>
                <p style={{ fontSize: '18px', color: '#8b6f47', marginBottom: '20px' }}>
                  or click to browse files
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666' }}>
                    <FaFilePdf color="#e74c3c" /> PDF
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666' }}>
                    <FaFileWord color="#2980b9" /> DOC
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666' }}>
                    <FaFileImage color="#27ae60" /> IMG
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#999' }}>
                  Maximum file size: 10MB
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          {uploadedFile && (
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                style={{
                  padding: '18px 40px',
                  backgroundColor: isProcessing ? '#95a5a6' : '#8fbc8f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(143, 188, 143, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    e.target.style.backgroundColor = '#7ba87b';
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(143, 188, 143, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isProcessing) {
                    e.target.style.backgroundColor = '#8fbc8f';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(143, 188, 143, 0.4)';
                  }
                }}
              >
                {isProcessing ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #ffffff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaRocket />
                    Start AI Grading
                    <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Steps Section - Vertical Layout without Number Circles */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '32px',
              color: '#b07c6c',
              textAlign: 'center',
              marginBottom: '40px',
              fontWeight: 'bold',
            }}
          >
            How It Works
          </h2>

          <div style={{ position: 'relative' }}>
            {/* Connecting Line */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                bottom: '0',
                width: '4px',
                backgroundColor: '#e9e6d7',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            ></div>

            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '50px',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Step Content */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: isLeft ? 'flex-end' : 'flex-start',
                      paddingRight: isLeft ? '30px' : '0',
                      paddingLeft: isLeft ? '0' : '30px',
                    }}
                  >
                    <div
                      style={{
                        borderRadius: '20px',
                        backgroundColor: 'white',
                        padding: '25px 30px',
                        maxWidth: '280px',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        border: '3px solid #e9e6d7',
                        transition: 'all 0.3s ease',
                        textAlign: isLeft ? 'right' : 'left',
                        fontWeight: 'bold',
                        color: '#b07c6c',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#8fbc8f';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.boxShadow =
                          '0 10px 30px rgba(143, 188, 143, 0.3)';
                        e.currentTarget.querySelectorAll('.icon').forEach(
                          (icon) => (icon.style.color = 'white')
                        );
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#b07c6c';
                        e.currentTarget.style.boxShadow =
                          '0 5px 15px rgba(0,0,0,0.1)';
                        e.currentTarget.querySelectorAll('.icon').forEach(
                          (icon) => (icon.style.color = '#b07c6c')
                        );
                      }}
                    >
                      <div
                        className="icon"
                        style={{
                          fontSize: '32px',
                          marginBottom: '15px',
                          color: '#b07c6c',
                          display: 'flex',
                          justifyContent: isLeft ? 'flex-end' : 'flex-start',
                        }}
                      >
                        {step.icon}
                      </div>
                      <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '14px',
                          lineHeight: '1.4',
                          opacity: 0.9,
                          fontWeight: 'normal',
                          color: '#666',
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Upload;
