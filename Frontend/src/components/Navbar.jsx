import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">COLLABHUB</Link>
        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-button" onClick={() => setMenuOpen(false)}>Home</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="nav-button" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/createpost" className="nav-button" onClick={() => setMenuOpen(false)}>
                Create
              </Link>
              <button className="nav-button logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-button" onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
              <Link to="/login" className="nav-button" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
