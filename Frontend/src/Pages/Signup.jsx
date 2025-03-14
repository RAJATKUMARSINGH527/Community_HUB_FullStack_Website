import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://community-hub-fullstack-website.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful", data);
        navigate("/login"); // Redirect after successful signup
        alert(data.message);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-icon">💬</div> {/* Chat icon at the top */}
        <h2 className="signup-title">Create an account</h2>
        <p className="signup-subtitle">Join our community today!</p>

        {error && <p className="error-message">{error}</p>}

        {/* Wrap in form */}
        <form onSubmit={handleSignup}>
          <label>Username</label>
          <input
            type="text"
            className="signup-input"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            className="signup-input"
            placeholder="Email Address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="signup-input"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            className="signup-input"
            placeholder="Confirm Password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account? <Link to="/login" className="login-link">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
