// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     setError("");
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    
//     const validUser = storedUsers.find(user => user.email === email && user.password === password);

//     if (validUser) {
//       console.log("Login successful", validUser);
//       // Store logged-in user in localStorage
//       localStorage.setItem("loggedInUser", JSON.stringify(validUser)); 
//       navigate("/dashboard"); // Redirect to dashboard after login
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-title">Login</h2>
//       {error && <p className="error-message">{error}</p>}
      
//       <input 
//         type="email" 
//         placeholder="Email" 
//         className="login-input" 
//         value={email} 
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input 
//         type="password" 
//         placeholder="Password" 
//         className="login-input" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className="login-button" onClick={handleLogin}>Login</button>
      
//       <p className="login-footer">
//         Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.",err);
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

        <label>Email Address</label>
        
        <input
          type="email"
          placeholder="Email Address"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button className="login-button" onClick={handleLogin}>Log In</button>

        <p className="login-footer">
          Need an account? <Link to="/signup" className="signup-link">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
