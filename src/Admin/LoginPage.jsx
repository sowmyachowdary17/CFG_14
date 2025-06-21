import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const dummyAdmin = { name: "Admin", email: "admin@cry.org", role: "admin" };

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@cry.org" && password === "admin123") {
      login(dummyAdmin, "dummy-token");
      navigate("/admin");
      return;
    }
    setError("Invalid credentials");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Admin Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} /><br/>
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} /><br/>
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5" };
const cardStyle = { width: "350px", padding: "40px", background: "#fff", boxShadow: "0 0 15px rgba(0,0,0,0.2)", borderRadius: "8px" };
const inputStyle = { width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", fontSize: "16px" };
const buttonStyle = { width: "100%", padding: "10px", background: "#00509e", color: "#fff", border: "none", borderRadius: "5px" };
