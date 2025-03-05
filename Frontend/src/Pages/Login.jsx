import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setError("");

    if (!email || !password || !username) {
      setError("Every fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
        alert(data.message);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
          <span>💬</span> {/* Placeholder for icon */}
        </div>
        <h2 className="login-title">Welcome back!</h2>
        <p className="login-subtitle">We're so excited to see you again!</p>

        {error && <p className="error-message">{error}</p>}

        {/* Wrap in form */}
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username..."
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Email Address..."
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password..."
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <p className="login-footer">
          Need an account?{" "}
          <Link to="/signup" className="signup-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
