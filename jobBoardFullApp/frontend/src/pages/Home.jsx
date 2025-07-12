import { Link } from "react-router-dom";
import './Home.css';
export const Home=()=> {
    return (
      <>  <div className="div1" style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome!</h1>
            <p>XQL is here to help you find the right job</p>
            <Link to="/seeJobs">
                <button style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>
                   Get started
                </button>
            </Link>
        </div>
        <div className="parent">
            <div className="child">
                <p>
                    XQL provides real time working experience <br/> 
                    your dream job is few clicks away!
                </p>
            </div>
            <div className="child">
                <p>
                    Apply right now to claim a working experience <br/> 
                   at your dream MNC
                </p>
            </div>
            <div className="child">
                <p>
                    Microsoft-"Senior Front End Developer" <br/> 
                   required right now!
                </p>
            </div>
        </div>
        </>
    );
}
