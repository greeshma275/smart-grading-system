import React, { useState } from "react";
import loginImage from "./assets/login.jpeg"; // adjust path if needed

const LoginRegister = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Persistent user storage using localStorage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('sms_users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  // Save users to localStorage whenever users state changes
  React.useEffect(() => {
    localStorage.setItem('sms_users', JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Show custom popup message
  const showPopup = (message, type = "info") => {
    setPopup({ show: true, message, type });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Close popup manually
  const closePopup = () => {
    setPopup({ show: false, message: "", type: "" });
  };

  // Check if user exists
  const userExists = (email) => {
    return users.some(user => user.email === email);
  };

  // Handle login
  const handleLogin = () => {
    if (!form.email || !form.password) {
      showPopup("Please fill in all fields", "error");
      return;
    }

    // Check if user exists first
    if (!userExists(form.email)) {
      showPopup("User doesn't exist, register first", "error");
      return;
    }

    // Find user with matching email and password
    const user = users.find(user => user.email === form.email && user.password === form.password);

    if (!user) {
      showPopup("Invalid password", "error");
      return;
    }

    showPopup("Login successful!", "success");
    // Reset form
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      if (onLogin) {
        onLogin();
      }
    }, 1500);
  };

  // Handle registration
  const handleRegister = () => {
    if (!form.email || !form.password || !form.confirmPassword) {
      showPopup("Please fill in all fields", "error");
      return;
    }

    if (userExists(form.email)) {
      showPopup("Already registered! Please login with your credentials", "error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showPopup("Password doesn't match", "error");
      return;
    }

    // Register new user
    const newUser = {
      email: form.email,
      password: form.password,
      role: role
    };

    setUsers([...users, newUser]);
    showPopup("Registered successfully", "success");

    // Reset form and switch to login
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsLogin(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0ebe6",
        position: "relative",
      }}
    >
      {/* Custom Popup */}
      {popup.show && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
          onClick={closePopup}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "30px 40px",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              border: `3px solid ${popup.type === "success" ? "#8fbc8f" : popup.type === "error" ? "#d4a574" : "#b07b69"}`,
              animation: "popupSlideIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: popup.type === "success" ? "#8fbc8f" : popup.type === "error" ? "#d4a574" : "#b07b69",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: "24px",
                color: "white",
              }}
            >
              {popup.type === "success" ? "✓" : popup.type === "error" ? "✕" : "ℹ"}
            </div>
            <h3
              style={{
                margin: "0 0 15px 0",
                color: "#333",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {popup.type === "success" ? "Success!" : popup.type === "error" ? "Error!" : "Information"}
            </h3>
            <p
              style={{
                margin: "0 0 25px 0",
                color: "#666",
                fontSize: "16px",
                lineHeight: "1.4",
              }}
            >
              {popup.message}
            </p>
            <button
              onClick={closePopup}
              style={{
                padding: "12px 30px",
                backgroundColor: popup.type === "success" ? "#8fbc8f" : popup.type === "error" ? "#d4a574" : "#b07b69",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          width: "850px",
          gap: "30px", // Gap between sections
          alignItems: "stretch",
        }}
      >
        {/* Left Side with Image */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(#a87465, #c28f7a)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "16px", // Rounded corners
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            minHeight: "450px",
          }}
        >
          <img
            src={loginImage}
            alt="Login"
            style={{
              width: "220px", // smaller
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Right Side Form */}
        <div
          style={{
            flex: 2,
            padding: "40px", // increased padding
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f5f1",
            borderRadius: "16px", // Rounded corners
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            minHeight: "450px",
          }}
        >
          {/* Toggle Buttons */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: isLogin ? "#b07b69" : "#e6dfd4",
                color: isLogin ? "#fff" : "#b07b69",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: !isLogin ? "#b07b69" : "#e6dfd4",
                color: !isLogin ? "#fff" : "#b07b69",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              width: "100%",
              maxWidth: "450px",
              animation: "fadeIn 0.5s ease-in-out",
            }}
          >
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: "14px", // taller
                border: "1px solid #b07b69",
                borderRadius: "8px",
                outline: "none",
                fontSize: "15px",
              }}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={{
                padding: "14px",
                border: "1px solid #b07b69",
                borderRadius: "8px",
                outline: "none",
                fontSize: "15px",
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={{
                padding: "14px",
                border: "1px solid #b07b69",
                borderRadius: "8px",
                outline: "none",
                fontSize: "15px",
              }}
            />

            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                style={{
                  padding: "14px",
                  border: "1px solid #b07b69",
                  borderRadius: "8px",
                  outline: "none",
                  fontSize: "15px",
                }}
              />
            )}

            <button
              type="submit"
              style={{
                padding: "14px",
                backgroundColor: "#b07b69",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
