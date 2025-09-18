import React, { useState } from "react";
import StudentHeader from "./StudentHeader";
import CoursesList from "./CoursesList";
import CourseNotes from "./CourseNotes";
import StudentMarks from "./StudentMarks";
import StudentProfile from "./StudentProfile";

const StudentDashboard = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "courses":
        return (
          <CoursesList
            title="Your Courses"
            onCourseClick={(course) => {
              setSelectedCourse(course);
              setCurrentPage("courseNotes");
            }}
          />
        );
      case "courseNotes":
        return (
          <div>
            <button
              style={{ marginBottom: 12 }}
              onClick={() => setCurrentPage("courses")}
            >
              ← Back to courses
            </button>
            <CourseNotes course={selectedCourse} canUpload={false} />
          </div>
        );
      case "marks":
        return <StudentMarks />;
      case "profile":
        return <StudentProfile user={user} />;
      default:
        return (
          <CoursesList
            title="Your Courses"
            onCourseClick={(course) => {
              setSelectedCourse(course);
              setCurrentPage("courseNotes");
            }}
          />
        );
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
