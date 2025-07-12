import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SeeJobs } from "./pages/seeJobs";
import { Login } from "./pages/login";
import { Apply } from "./pages/apply";
import './App.css';
import { SiExpertsexchange } from "react-icons/si";
import { Register } from "./pages/register";
export  const App=()=>{
    return (
        <BrowserRouter>
        
        
            <Navbar />
            < SiExpertsexchange  className="logo"/>
            <div className="main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/seejobs" element={<SeeJobs />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/apply" element={<Apply />} />
            </Routes>
            </div>
        </BrowserRouter>
    );
}