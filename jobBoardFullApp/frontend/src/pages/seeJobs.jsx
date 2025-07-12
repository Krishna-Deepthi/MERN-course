import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./seeJobs.css";
import { useNavigate } from "react-router-dom";

export const SeeJobs=()=> {
    const [jobs, setJobs] = useState([]);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
   const  navigate=useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);  
    }, []);

    const handleApply=(e)=>{
        if(!isLoggedIn){
           e.preventDefault(); 
            alert("Please login first!");
            navigate("/login");
        }
       

    };
  

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/jobs");
                setJobs(res.data);
            } catch (err) {
                console.error("Failed to fetch jobs", err);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="seeJobs-container">
            <h2 id="heading">Available Job Listings</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Role</th>
                        <th>Salary</th>
                        <th>Description</th>
                        <th>Apply</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.length === 0 ? (
                        <tr>
                            <td colSpan="5">No jobs available</td>
                        </tr>
                    ) : (
                        jobs.map((job) => (
                            <tr key={job._id}>
                                <td>{job.company_name}</td>
                                <td>{job.role}</td>
                                <td>{job.annual_package} LPA</td>
                                <td>{job.requirements}</td>
                                <td>
                                   <Link  onClick={handleApply} className="apply-btn" to="/apply">Apply</Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
