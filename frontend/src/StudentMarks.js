import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const marksData = [
  { subject: "Math", marks: 85 },
  { subject: "Physics", marks: 78 },
  { subject: "CS", marks: 92 },
  { subject: "ML", marks: 88 },
  { subject: "INS", marks: 81 },
  { subject: "ADA", marks: 90 }
];

const StudentMarks = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#fff8f0",
        boxSizing: "border-box"
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          color: "#5b3b2f",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold"
        }}
      >
        Your Marks
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr", // ✅ table (40%) and chart (60%)
          gap: "40px",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {/* Table on Left */}
        <table
          border="1"
          cellPadding="12"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            background: "#fff",
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            borderRadius: "12px",
            overflow: "hidden",
            fontSize: "16px"
          }}
        >
          <thead style={{ background: "#b07b69", color: "#fff" }}>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>Subject</th>
              <th style={{ textAlign: "center", padding: "12px" }}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {marksData.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{item.subject}</td>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>{item.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Chart on Right (Responsive) */}
        <div
          style={{
            width: "100%",
            height: "400px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
            padding: "20px"
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marksData}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="marks" fill="#b07b69" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentMarks;
