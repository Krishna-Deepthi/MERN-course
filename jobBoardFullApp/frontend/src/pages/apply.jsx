import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import './apply.css'

export const Apply = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    if (location.state) {
      setCompanyName(location.state.company_name || "");
      setRole(location.state.role || "");
    } else {
      fetchJobs();
    }
  }, []);


  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };


  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("userId");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }
console.log("Submitting payload:", {
  name,
  age,
  experience,
  company_name: companyName,
  role,
  user_id: localStorage.getItem("userId")
});

      const res = await axios.post(
        "http://localhost:5000/api/applications/apply",
        {
          name,
          age,
          experience,
          company_name: companyName,
          role,
          user_id 
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Application submitted successfully");
      navigate("/seeJobs");
    } catch (err) {
      console.error(err);
      alert("Failed to submit application");
    }
  };

  return (<>
  <h2>Job Application Form</h2>
    <div className="apply-form-container">
      
      <form onSubmit={handleApply} className="inside">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />

        <label>Experience (years):</label>
        <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />
        {companyName === "" ? (
          <>
            <label>Apply To:</label>
            <select
              value={companyName}
              onChange={(e) => {
                const [company, jobRole] = e.target.value.split("|");
                setCompanyName(company);
                setRole(jobRole);
              }}
              required
            >
              <option value="">Select Job</option>
              {jobs.map((job) => (
                <option key={job._id} value={`${job.company_name}|${job.role}`}>
                  {job.company_name} - {job.role}
                </option>
              ))}
            </select>
          </>
        ) : (
          <p>
            Applying to: <strong>{companyName} - {role}</strong>
          </p>
        )}

        <button type="submit">Apply</button>
      </form>
    </div>
  </>);
};

