import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import HomePage from "../Pages/HomePage";
// import Logout from "../Pages/Logout";
import Dashboard from "../Pages/Dashboard";


const AppRouter = () => {
  return (
    
      
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage/>} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route 
            path="/dashboard" 
            element={
              
                <Dashboard />
              
            } 
          />
      </Routes>
    </Router>
    
  );
};

export default AppRouter;
