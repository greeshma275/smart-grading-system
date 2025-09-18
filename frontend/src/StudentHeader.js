import React from "react";
import { FaBook, FaChartBar, FaUser } from "react-icons/fa";

const StudentHeader = ({ onNavigate, onLogout, currentPage }) => {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#b07b69",
      padding: "10px 20px",
      color: "#fff"
    }}>
      <h2>🎓 Student Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => onNavigate("courses")} style={{ background: "none", border: "none", color: currentPage === "courses" ? "#ffe4c4" : "#fff" }}>
          <FaBook /> Courses
        </button>
        <button onClick={() => onNavigate("marks")} style={{ background: "none", border: "none", color: currentPage === "marks" ? "#ffe4c4" : "#fff" }}>
          <FaChartBar /> Marks
        </button>
        <button onClick={() => onNavigate("profile")} style={{ background: "none", border: "none", color: currentPage === "profile" ? "#ffe4c4" : "#fff" }}>
          <FaUser /> Profile
        </button>
        <button onClick={onLogout} style={{ background: "#fff", color: "#b07b69", border: "none", borderRadius: "5px", padding: "5px 10px" }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentHeader;
