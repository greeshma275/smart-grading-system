import React, { useState } from "react";
import StudentHeader from "./StudentHeader";
import StudentCourses from "./StudentCourses";
import StudentMarks from "./StudentMarks";
import StudentProfile from "./StudentProfile";

const StudentDashboard = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState("courses");

  const renderPage = () => {
    switch (currentPage) {
      case "courses":
        return <StudentCourses />;
      case "marks":
        return <StudentMarks />;
      case "profile":
        return <StudentProfile user={user} />;
      default:
        return <StudentCourses />;
    }
  };

  return (
    <div>
      <StudentHeader onNavigate={setCurrentPage} onLogout={onLogout} currentPage={currentPage} />
      <div style={{ padding: "20px" }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default StudentDashboard;
