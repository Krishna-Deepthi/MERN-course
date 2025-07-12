import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { Login } from "../pages/login";


export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [location]);

    const handleApplyClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            alert("Please login first!");
            navigate("/login");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/"); 
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" style={{ color: location.pathname === "/" ? "#0505A4" : "white" }}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/seeJobs" style={{ color: location.pathname === "/seeJobs" ? "#0505A4" : "white" }}>
                        See Jobs
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/apply" 
                        style={{ color: location.pathname === "/apply" ? "#0505A4" : "white" }}
                        onClick={handleApplyClick}
                    >
                        Apply
                    </Link>
                </li>

                {!isLoggedIn ? (
                    <>
                        <li>
                            
                            <Link to="/register" style={{ color: location.pathname === "/register" ? "#0505A4" : "white" }}>
                                Register
                            </Link>
                        </li>
                        <li>
                            <Popup trigger={<button className="popup-btn" style={{background:"none",border:"none",outline:"none"}}>Login</button>} modal nested>
                             {(close) => (
                    <Login onSuccess={() => {
                      setIsLoggedIn(true);}}
                      close={close}
                     />
                
                )}
              </Popup>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="#" onClick={handleLogout}>
                            Logout
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

  