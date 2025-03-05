import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import HomePage from "../Pages/HomePage";
import Logout from "../Pages/Logout";
import CreatePost from "../Pages/CreatePost";
import Dashboard from "../Pages/Dashboard";



const AppRouter = () => {
  const token = localStorage.getItem("token");
  return (
    
      
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/createpost" element={token ? <CreatePost /> : <Login />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
    
  );
};

export default AppRouter;
