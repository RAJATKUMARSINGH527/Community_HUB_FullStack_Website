// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Signup.css";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = () => {
//     setError("");
//     if (!username || !email || !password) {
//       setError("All fields are required");
//       return;
//     }

//     // Check if user already exists in localStorage
//     const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const userExists = existingUsers.some(user => user.email === email);

//     if (userExists) {
//       setError("User with this email already exists");
//       return;
//     }

//     // Save new user to localStorage
//     const newUser = { username, email, password };
//     localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

//     console.log("Signup successful", newUser);
//     navigate("/login"); // Redirect after successful signup
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h2 className="signup-title">Sign Up</h2>
//         {error && <p className="error-message">{error}</p>}

//         <input
//           type="text"
//           placeholder="Username"
//           className="signup-input"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="signup-input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="signup-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="signup-button" onClick={handleSignup}>Sign Up</button>

//         <p className="signup-footer">
//           Already have an account? <Link to="/login" className="login-link">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;



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

  const handleSignup = async () => {
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
      const response = await fetch("http://localhost:5000/auth/register", {
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
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.",err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-icon">💬</div> {/* Chat icon at the top */}
        <h2 className="signup-title">Create an account</h2>
        <p className="signup-subtitle">Join our community today!</p>

        {error && <p className="error-message">{error}</p>}

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

        <button className="signup-button" onClick={handleSignup}>Sign Up</button>

        <p className="signup-footer">
          Already have an account? <Link to="/login" className="login-link">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;