import { useState } from "react"
import axios from "axios"
import './login.css'

export const Login=({onSuccess,close})=>{
          const [email,setEmail]=useState();
          const [password,setPassword]=useState();
          const handleSubmit=async(e)=>{
            e.preventDefault();
               try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            alert(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId",res.data.userId); 
            if(onSuccess) onSuccess();
            if (close) close();
        } catch (err) {
            console.error(err);
            alert("Login failed. Please check credentials.");
        }
          }
    return(
  <>
      <div className="login-container">
        <button className="login-close-btn" onClick={close}>X</button>
        <h1>Login</h1>
        
        <form onSubmit={handleSubmit}>
          <label>Email</label>
            <input type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password</label>
            <input type="password" placeholder="enter password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
            <button className="login-btn"type="submit">Login</button>
        </form>
        </div>
       
        </>
    )
}