import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Customer.css'

const Customer = () => {
    const[customerlist, setcustomer] = useState([]);
    const[haveedit, setedit] = useState(false);
    const[haveadd, setadd] = useState(false);
    const[haveremove, setremove] = useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        GetUserAccess();
        loadCustomer();
    }, []);
const loadCustomer = () => {
    fetch("http://localhost:8000/customer").then(res => {
        if(!res.ok){
            return false;
        }
        return res.json()
    }).then(res => {
        setcustomer(res)
    })
}

const handleadd = () => {
    if(haveadd){
        toast.success("added")
    }
    else{
        toast.warning('you are not having access for add')
    }
    
}
const handleedit = () => {
    if(haveedit){
        toast.success("edited")
    }
    else{
        toast.warning('you are not having access for edit')
    }
    
}
    
const handleremove = () => {
    if(haveremove){
        toast.success("removed")
    }
    else{
        toast.warning('you are not having access for edit')
    }
    
}


const GetUserAccess = () =>{
    const userrole = sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole').toString():'';
    fetch("http://localhost:8000/roleaccess?role="+userrole+"&menu=customer")
    .then(res => {
        if(!res.ok){
            navigate('/')
            toast.warning('you are not authorized to access')
            return false
        }
        return res.json();
    })
    .then(res => {
        if(res.length>0){
            setremove(true);
            let userobj=res[0]
           setedit(userobj.haveedit);
            setadd(userobj.haveadd);
            setremove(userobj.havedelete);
        }
        
    })
}
    return(
        <div className="container">
           <button className="btn btn-success" onClick={handleadd}>Add+</button>
           <br/>
           <br/>
            <div className="card">
                <div className="card-header">
                <h1>Customer List</h1>
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead className="bg-dark">
                        <tr>
                            <td>Code</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {customerlist && customerlist.map(item => (
                            <tr key={item.id}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={handleedit}>Edit</button>
                                    &nbsp;
                                    <button className="btn btn-danger" onClick={handleremove}>Remove</button>
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer">

                </div>
            </div>
        
        </div>
    )
}

export default Customer;