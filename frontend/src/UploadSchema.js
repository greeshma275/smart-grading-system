import React, { useState } from 'react';
import Header from './Header';

const UploadSchema = ({ onNavigate, onLogout }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedNotes, setUploadedNotes] = useState(null);
  const [uploadedAnswerKey, setUploadedAnswerKey] = useState(null);

  const [totalQuestions, setTotalQuestions] = useState(0);

  const [selected, setSelected] = useState({
    short: [],
    long: [],
    example: [],
    general: [],
    types: []
  });

  // Define blocking groups
  const getBlockingGroup = (category) => {
    if (category === 'short' || category === 'long') {
      return ['short', 'long'];
    }

    if (category === 'example' || category === 'general' || category === 'types') {
      return ['example', 'general', 'types'];
    }
    return [category];
  };

  // Check if a question is already selected in the same blocking group
  const isQuestionBlocked = (questionNum, currentCategory) => {
    const blockingGroup = getBlockingGroup(currentCategory);
    
    for (const category of blockingGroup) {
      if (category !== currentCategory && selected[category].includes(questionNum)) {
        return true;
      }
    }
    return false;
  };

  const toggleSelection = (num, category) => {
    setSelected((prev) => {
      const alreadySelected = prev[category].includes(num);
      
      // If already selected in this category, remove it
      if (alreadySelected) {
        return {
          ...prev,
          [category]: prev[category].filter((n) => n !== num)
        };
      }
      
      // Check if blocked within the same group only
      const blockingGroup = getBlockingGroup(category);
      const isBlockedInGroup = blockingGroup.some(cat => 
        cat !== category && prev[cat].includes(num)
      );
      
      if (!isBlockedInGroup) {
        return {
          ...prev,
          [category]: [...prev[category], num]
        };
      }
      
      return prev; // Don't change if blocked
    });
  };

  // Upload handler
  const handleFileSelect = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "notes") setUploadedNotes(e.target.files[0]);
      else if (type === "answerKey") setUploadedAnswerKey(e.target.files[0]);
      else if (type === "booklet") setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f6f0" }}>
      <Header onNavigate={onNavigate} onLogout={onLogout} />

      <div style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", color: "#b07c6c", textAlign: "center", marginBottom: "40px", fontWeight: "bold" }}>
          Upload schema
        </h1>

        {/* Upload Notes */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>📘 Upload Notes</h2>
          <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileSelect(e, "notes")} />
          {uploadedNotes && <p style={fileTextStyle}>Selected: {uploadedNotes.name}</p>}
        </div>

        {/* Upload Answer Key */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>📝 Upload Answer Key (PDF)</h2>
          <input type="file" accept=".pdf" onChange={(e) => handleFileSelect(e, "answerKey")} />
          {uploadedAnswerKey && <p style={fileTextStyle}>Selected: {uploadedAnswerKey.name}</p>}
        </div>

        {/* Upload Student Answer Booklet
        <div style={sectionStyle}>
          <h2 style={headingStyle}>📄 Upload Answer Booklet (Handwritten)</h2>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileSelect(e, "booklet")} />
          {uploadedFile && <p style={fileTextStyle}>Selected: {uploadedFile.name}</p>}
        </div> */}

        {/* Question Setup */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>⚙️ Question Setup</h2>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>Total Questions:</label>
          <input
            type="number"
            /*min="0"*/
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 0)}
            style={{ padding: "6px", borderRadius: "8px", border: "1px solid #ccc" }}
          />

          {totalQuestions > 0 && (
            <div style={{ marginTop: "25px" }}>
              
              {/* Card 1: Answer Length Classification */}
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>📝 Answer Length Classification</h3>
                <p style={cardDescriptionStyle}>Choose either Short Answer OR Long Answer format for each question</p>
                
                {/* Short Answer */}
                <h4 style={subHeadingStyle}>📌 Short Answer Questions</h4>
                <div style={gridBox}>
                  {Array.from({ length: totalQuestions }, (_, i) => {
                    const questionNum = i + 1;
                    const isSelected = selected.short.includes(questionNum);
                    const isBlocked = isQuestionBlocked(questionNum, 'short');
                    
                    return (
                      <button
                        key={i}
                        onClick={() => !isBlocked && toggleSelection(questionNum, "short")}
                        disabled={isBlocked}
                        style={{
                          ...numberBox,
                          backgroundColor: isSelected ? "#8fbc8f" : isBlocked ? "#f0f0f0" : "white",
                          color: isSelected ? "white" : isBlocked ? "#ccc" : "#333",
                          opacity: isBlocked ? 0.5 : 1,
                          cursor: isBlocked ? "not-allowed" : "pointer",
                          filter: isBlocked ? "blur(1px)" : "none"
                        }}
                      >
                        {questionNum}
                      </button>
                    );
                  })}
                </div>

                {/* Long Answer */}
                <h4 style={subHeadingStyle}>📌 Long Answer Questions</h4>
                <div style={gridBox}>
                  {Array.from({ length: totalQuestions }, (_, i) => {
                    const questionNum = i + 1;
                    const isSelected = selected.long.includes(questionNum);
                    const isBlocked = isQuestionBlocked(questionNum, 'long');
                    
                    return (
                      <button
                        key={i}
                        onClick={() => !isBlocked && toggleSelection(questionNum, "long")}
                        disabled={isBlocked}
                        style={{
                          ...numberBox,
                          backgroundColor: isSelected ? "#8fbc8f" : isBlocked ? "#f0f0f0" : "white",
                          color: isSelected ? "white" : isBlocked ? "#ccc" : "#333",
                          opacity: isBlocked ? 0.5 : 1,
                          cursor: isBlocked ? "not-allowed" : "pointer",
                          filter: isBlocked ? "blur(1px)" : "none"
                        }}
                      >
                        {questionNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: Question Type Classification */}
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}>🎯 Question Type Classification</h3>
                <p style={cardDescriptionStyle}>Categorize questions by their approach: Example-based, General-based, or Types-based</p>
                
                {/* Example-based */}
                <h4 style={subHeadingStyle}>📌 Example-based Questions</h4>
                <div style={gridBox}>
                  {Array.from({ length: totalQuestions }, (_, i) => {
                    const questionNum = i + 1;
                    const isSelected = selected.example.includes(questionNum);
                    const isBlocked = isQuestionBlocked(questionNum, 'example');
                    
                    return (
                      <button
                        key={i}
                        onClick={() => !isBlocked && toggleSelection(questionNum, "example")}
                        disabled={isBlocked}
                        style={{
                          ...numberBox,
                          backgroundColor: isSelected ? "#8fbc8f" : isBlocked ? "#f0f0f0" : "white",
                          color: isSelected ? "white" : isBlocked ? "#ccc" : "#333",
                          opacity: isBlocked ? 0.5 : 1,
                          cursor: isBlocked ? "not-allowed" : "pointer",
                          filter: isBlocked ? "blur(1px)" : "none"
                        }}
                      >
                        {questionNum}
                      </button>
                    );
                  })}
                </div>

                {/* General-based */}
                <h4 style={subHeadingStyle}>📌 General-based Questions</h4>
                <div style={gridBox}>
                  {Array.from({ length: totalQuestions }, (_, i) => {
                    const questionNum = i + 1;
                    const isSelected = selected.general.includes(questionNum);
                    const isBlocked = isQuestionBlocked(questionNum, 'general');
                    
                    return (
                      <button
                        key={i}
                        onClick={() => !isBlocked && toggleSelection(questionNum, "general")}
                        disabled={isBlocked}
                        style={{
                          ...numberBox,
                          backgroundColor: isSelected ? "#8fbc8f" : isBlocked ? "#f0f0f0" : "white",
                          color: isSelected ? "white" : isBlocked ? "#ccc" : "#333",
                          opacity: isBlocked ? 0.5 : 1,
                          cursor: isBlocked ? "not-allowed" : "pointer",
                          filter: isBlocked ? "blur(1px)" : "none"
                        }}
                      >
                        {questionNum}
                      </button>
                    );
                  })}
                </div>

                {/* Types-based */}
                <h4 style={subHeadingStyle}>📌 Types-based Questions</h4>
                <div style={gridBox}>
                  {Array.from({ length: totalQuestions }, (_, i) => {
                    const questionNum = i + 1;
                    const isSelected = selected.types.includes(questionNum);
                    const isBlocked = isQuestionBlocked(questionNum, 'types');
                    
                    return (
                      <button
                        key={i}
                        onClick={() => !isBlocked && toggleSelection(questionNum, "types")}
                        disabled={isBlocked}
                        style={{
                          ...numberBox,
                          backgroundColor: isSelected ? "#8fbc8f" : isBlocked ? "#f0f0f0" : "white",
                          color: isSelected ? "white" : isBlocked ? "#ccc" : "#333",
                          opacity: isBlocked ? 0.5 : 1,
                          cursor: isBlocked ? "not-allowed" : "pointer",
                          filter: isBlocked ? "blur(1px)" : "none"
                        }}
                      >
                        {questionNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            style={{
              padding: "15px 35px",
              backgroundColor: "#8fbc8f",
              color: "white",
              border: "none",
              borderRadius: "25px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Save & Upload to Database
          </button>
        </div>

        {/* Debug Info - Remove in production */}
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f0f0f0", borderRadius: "10px", fontSize: "14px" }}>
          <h4>Selected Questions:</h4>
          <p><strong>Short:</strong> {selected.short.join(', ') || 'None'}</p>
          <p><strong>Long:</strong> {selected.long.join(', ') || 'None'}</p>
          <p><strong>Example-based:</strong> {selected.example.join(', ') || 'None'}</p>
          <p><strong>General-based:</strong> {selected.general.join(', ') || 'None'}</p>
          <p><strong>Types-based:</strong> {selected.types.join(', ') || 'None'}</p>
        </div>
      </div>
    </div>
  );
};

// Styles
const sectionStyle = {
  background: "white",
  borderRadius: "15px",
  padding: "25px",
  marginBottom: "30px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
};

const headingStyle = {
  color: "#b07c6c",
  marginBottom: "15px",
  fontWeight: "bold"
};

const subHeadingStyle = {
  marginBottom: "10px",
  marginTop: "20px",
  color: "#333"
};

const fileTextStyle = {
  marginTop: "10px",
  color: "#333",
  fontWeight: "bold"
};

const gridBox = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
  gap: "8px",
  marginBottom: "15px"
};

const cardStyle = {
  background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: "20px",
  padding: "30px",
  marginBottom: "30px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
  border: "2px solid #e9ecef"
};

const cardTitleStyle = {
  color: "#495057",
  marginBottom: "10px",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "3px solid #8fbc8f",
  paddingBottom: "15px"
};

const cardDescriptionStyle = {
  color: "#6c757d",
  fontSize: "16px",
  textAlign: "center",
  marginBottom: "25px",
  fontStyle: "italic"
};

const numberBox = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "8px",
  textAlign: "center",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.2s"
};

export default UploadSchema;