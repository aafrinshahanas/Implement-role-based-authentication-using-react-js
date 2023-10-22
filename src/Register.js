import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Register.css'

const Register = () => {
const[id, idChange] = useState("");
const[name, nameChange] = useState("");
const[password, passwordChange] = useState("");
const[email, emailChange] = useState("");
const[phone, phoneChange] = useState("");
const[role, roleChange] = useState("");
const[address, addressChange] = useState("");

const navigate=useNavigate();
const IsValidate = () => {
    let isproceed=true;
    let errormessage = 'Please enter the value in '
    if(id === null || id === ''){
        isproceed=false;
        errormessage += ' Username'
    }
    if(name === null || name === ''){
        isproceed=false;
        errormessage += ' Full name'
    }
    if( email === null || email === ''){
        isproceed=false;
        errormessage += ' Email ID'
    }
    if(password === null || password === ''){
        isproceed=false;
        errormessage += ' Password'
    }
    if(!isproceed){
        toast.warning(errormessage)
    }
    return isproceed;
}

    const handleSubmit = (e) =>{
       
        e.preventDefault();
        let regobj = {id, name, password, email, phone, role, address}
        console.log(regobj);
        if (IsValidate()){
        fetch("http://localhost:8000/user", {
            method:"POST",
            headers:{'content-type':'application/json'},
            body: JSON.stringify(regobj)
        }).then((res) => {
          toast.success('Registered successfully.');
          navigate('/login')
        }).catch((err) => {
            toast.error('Failed:'+err.message)
        });
    }
    }

    return(
        <div>
            <div className="offset-lg-3 col-lg-6">
              <form className="container" onSubmit={handleSubmit}>
                 <div className="card" style={{background: "#171717"}}>
                     <div className="card-header">
                     <h1 style={{color: "#3DCFD3"}}>User Registeration</h1>
                     </div>
                     <div className="card-body">
                         <div className="row">
                                 <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                      <input className="form-control" value={id} onChange={e => idChange(e.target.value)}></input>
                                    </div>
                                 </div>
                                 <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                      <input type="password" className="form-control" value={password} onChange={e => passwordChange(e.target.value)}></input>
                                    </div>
                                 </div>
                                 <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name <span className="errmsg">*</span></label>
                                      <input className="form-control" value={name} onChange={e => nameChange(e.target.value)}></input>
                                    </div>
                                 </div>
                                 <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                      <input type="email" className="form-control" value={email} onChange={e => emailChange(e.target.value)}></input>
                                    </div>
                                 </div>
                                 <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                      <input className="form-control" value={phone} onChange={e => phoneChange(e.target.value)}></input>
                                    </div>
                                 </div>
                                 <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Role <span className="errmsg">*</span></label>
                                        <select className="form-control" value={role} onChange={e => roleChange(e.target.value)}>
                                        <option value="/">Select below option</option>
                                          <option value="admin">Admin</option>
                                          <option value="user">User</option>
                                        
                                        </select>
                                    
                                    </div>
                                 </div>
                                 <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea className="form-control" value={address} onChange={e => addressChange(e.target.value)}></textarea>
                                    </div>
                                 </div>
                         </div>
                     </div>
                     <div className="card-footer">
                         <button type="submit" className="primary-btn">Register</button>
                        
                     </div>
                 </div>
              </form>
            </div>
            
        </div>
    )
}

export default Register;