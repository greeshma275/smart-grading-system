import React, { useState } from "react";
import Header from "./Header";
import CoursesList from "./CoursesList";
import CourseNotes from "./CourseNotes";

const TeacherCourses = ({ onNavigate, onLogout }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f6f0" }}>
      <Header onNavigate={onNavigate} onLogout={onLogout} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        {!selectedCourse ? (
          <CoursesList
            title="Manage Course Notes"
            onCourseClick={(c) => setSelectedCourse(c)}
          />
        ) : (
          <div>
            <button
              style={{ marginBottom: 12 }}
              onClick={() => setSelectedCourse(null)}
            >
              ← Back to courses
            </button>
            <CourseNotes course={selectedCourse} canUpload={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;
