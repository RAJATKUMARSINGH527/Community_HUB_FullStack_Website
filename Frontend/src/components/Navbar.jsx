// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
  
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   }

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo */}
//         <Link to="/" className="logo">
//           COLLABHUB
//         </Link>

//         {/* Menu Button for Mobile */}
//         <button
//           className="menu-button"
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//           aria-expanded={menuOpen}
//         >
//           {menuOpen ? "✖" : "☰"}
//         </button>

//         {/* Navigation Links */}
//         <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//           <Link to="/" className="nav-button" onClick={() => setMenuOpen(false)}>
//            Home
//           </Link>
          
//           {user ? (
//         <>
//           <Link to="/dashboard">Dashboard</Link>
//           <button onClick={handleLogout}>Logout</button> {/* Direct Logout */}
//         </>
//       ) : (
//         <>

//           <Link to="/login" className="nav-button" onClick={() => setMenuOpen(false)}>
//             Login
//           </Link>
//           <Link to="/signup" className="nav-button signup" onClick={() => setMenuOpen(false)}>
//             Signup
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Track the user state

  const navigate = useNavigate();

  // Check if a user is logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // If logged in, set user from localStorage
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove logged-in user from localStorage
    setUser(null); // Update the user state to null
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">COLLABHUB</Link>

        {/* Menu Button for Mobile */}
        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-button" onClick={() => setMenuOpen(false)}>Home</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="nav-button" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button className="nav-button logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button " onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="nav-button signup" onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
