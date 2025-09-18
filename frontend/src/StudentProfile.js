import React from "react";
import profileImg from "./assets/profile.png";     // student avatar
import profileBg from "./assets/profilebg.png";   // background image

const StudentProfile = () => {
  const profile = {
    name: "Ananya G Shetty",
    rollNo: "1RN22ISO12",
    department: "ISE",
    email: "ananya2004@gmail.com",
    image: profileImg
  };

  return (
    <div
      style={{
        height: "100vh", // ✅ full screen height
        width: "100vw",  // ✅ full screen width
        backgroundImage: `url(${profileBg})`,
        backgroundSize: "cover",      // ✅ covers full screen
        backgroundPosition: "center", // ✅ centered image
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden" // ✅ prevent scrollbars
      }}
    >
      {/* Profile Card */}
      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
          padding: "40px 60px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          background: "rgba(255, 255, 255, 0.8)", // ✅ glass effect
          backdropFilter: "blur(12px)",            // ✅ smooth blur
        //   width: "90%",
        //   maxWidth: "900px", // ✅ bigger card
        //   minHeight: "400px" // ✅ taller
        width: "85%",
          maxWidth: "750px"
        }}
      >
        {/* Profile Image */}
        <div>
          <img
            src={profile.image}
            alt="Profile"
            style={{
              width: "200px",  // ✅ bigger image
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "6px solid #d1a684",
              boxShadow: "0 6px 15px rgba(0,0,0,0.25)"
            }}
          />
        </div>

        {/* Profile Info */}
        <div>
          <h2
            style={{
              marginBottom: "20px",
              color: "#4a2c2a",
              fontSize: "26px"
            }}
          >
            Profile Details
          </h2>
          <p style={{ margin: "8px 0", fontSize: "18px" }}>
            <b>Name:</b> {profile.name}
          </p>
          <p style={{ margin: "8px 0", fontSize: "18px" }}>
            <b>Roll No:</b> {profile.rollNo}
          </p>
          <p style={{ margin: "8px 0", fontSize: "18px" }}>
            <b>Department:</b> {profile.department}
          </p>
          <p style={{ margin: "8px 0", fontSize: "18px" }}>
            <b>Email:</b> {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
