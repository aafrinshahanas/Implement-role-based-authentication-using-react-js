import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css'

const Login = () => {
const [username, setusername] = useState('');
const [password, setpassword] = useState('');

const usenavigate = useNavigate();

useEffect(() => {
sessionStorage.clear()
}, []);

const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()){
     console.log('procceed')
     fetch('http://localhost:8000/user/'+username)
     .then((res) => {
        return res.json();
     })
     .then((data) => {
      console.log(data)
      if(Object.keys(data).length === 0){
        toast.error('Please enter valid username')
      }else if(data.password === password){
        toast.success('Logged in successfully')
              sessionStorage.setItem('username', username)
              sessionStorage.setItem('userrole', data.role)
              usenavigate('/')     
        }
       else{
        toast.error('Please enter valid credential')
             }
     })
     .catch((err) => {
        toast.error('Login Failed due to : '+err.message)
     })
    }
}

const validate = () => {
    let result = true;
    if(username === null || username === ''){
        result = false;
        toast.warning('Please enter user name')
    }
    if(password === null || password === ''){
        result = false;
        toast.warning('Please enter password')
    }
    return result;
}

return(
    <div>
          <div className="offset-lg-3 col-lg-6">
               <form onSubmit={proceedLogin} className="container">
               <div className="card" style={{background: "#171717"}}>
                <div className="card-header">
                    <h1 style={{color: "#3DCFD3"}}>Login page</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>User Name <span className="errmsg">*</span></label>
                           <input className="form-control" value={username} onChange={(e) => setusername(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label>Password <span className="errmsg">*</span></label>
                           <input type="password" className="form-control" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="primary-btn" type="submit">Login</button>
                        &nbsp;
                        <Link className="sec-btn" to={"/register"}>New User</Link>
                    </div>
                </div>
               </form>
          </div>
       
    </div>
)
}

export default Login;