import React from "react";
import coursesBg from "./assets/coursesbg.png";

export const COURSES = [
  { name: "Mathematics", code: "MATH101", teacher: "Dr. Rao" },
  { name: "Physics", code: "PHY102", teacher: "Dr. Sharma" },
  { name: "Computer Science", code: "CS103", teacher: "Prof. Mehta" },
  { name: "Machine Learning", code: "ML201", teacher: "Dr. Varma" },
  { name: "Information Security (INS)", code: "INS301", teacher: "Dr. Nair" },
  { name: "Advanced Data Algorithms (ADA)", code: "ADA401", teacher: "Prof. Iyer" }
];

const CoursesList = ({ onCourseClick, title = "Your Courses" }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${coursesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          color: "#000",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          textShadow: "1px 1px 3px rgba(255,255,255,0.6)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {COURSES.map((course, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(6px)",
              padding: "25px",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              textAlign: "center",
              transition: "transform 0.2s ease-in-out",
              cursor: onCourseClick ? "pointer" : "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => onCourseClick && onCourseClick(course)}
          >
            <h3
              style={{
                marginBottom: "10px",
                color: "#000",
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(255,255,255,0.6)",
              }}
            >
              {course.name}
            </h3>
            <p style={{ color: "#000" }}>
              <b>Code:</b> {course.code}
            </p>
            <p style={{ color: "#000" }}>
              <b>Teacher:</b> {course.teacher}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
