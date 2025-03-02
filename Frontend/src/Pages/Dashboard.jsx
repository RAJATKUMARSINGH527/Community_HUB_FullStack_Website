import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
