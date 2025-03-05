import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (if using JWT or local storage)
    localStorage.removeItem("token");  // Remove stored auth token
    localStorage.removeItem("user");   // Remove user details (optional)
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div></div>
  );
};

export default Logout;
