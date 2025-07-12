import { useState } from "react"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
import './register.css'
export const Register=()=>{
          const [email,setEmail]=useState();
          const [password,setPassword]=useState();
          const navigate=useNavigate();
          const handleSubmit=async(e)=>{
            e.preventDefault();
               try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password
            });
            alert(res.data.message);
            localStorage.setItem("token", res.data.token); 
            navigate('/'); 
        } catch (err) {
            console.error(err);
            alert("Registration failed. Please check credentials.");
        }
          }
    return(
  <>
      <div className="register-container">
        <h1>Register</h1>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" placeholder="enter password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
            <p>Already registered? login to continue <Link  className="login-link" to="/login">Login</Link> </p>
            
        </form>
        </div>
        </div>
        </>
    )
}