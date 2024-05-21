import { useState } from "react";
import BlogIcon from "../assets/img/android-chrome-192x192.png";
import instance from "../utils/api";
import { URLS } from "../constants";
import { Notify } from "../components/Notify";
import { Link, useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
const navigate= useNavigate();
  const[email, setEmail] = useState("");
  const[msg, setMsg] = useState("");
  const[error, setError] = useState("");
  const[isDisabled, setIsDisabled] = useState(false);
  
  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      setIsDisabled(true)
      const result = await instance.post(URLS.GENERATE_FP, {email});
      if (result.data.data){
        setMsg(result.data.data);
        setTimeout(() => {
          navigate("/verify-password", {state:{email}});
        }, 3000);
       
    }

    }  catch(e){
        setError(e?.response?.data?.msg || "Something went wrong");
    } finally {
      setIsDisabled(false)
      setTimeout(() => {
          setError("");
          setMsg("");
      }, 3000);
      setEmail("")

    }

   }
  return (
    <div style={{minHeight:"25rem", background: "rgb(241,236,236)"}} >
    <div className="d-flex justify-content-center align-items-center min-vh-100">
   
       <div className="shadow card" style={{width: "25rem"}}>
        <div className="card-body">
            <h5 className="card-title text-center">
              <img src={BlogIcon} width="20%" className="img-fluid"
              alt="Logo"/>
               <div className="h2 p-2">Forget Password</div>
               </h5>
               {(msg || error) && (
               <Notify 
               variant={error?"danger": "success"} msg={msg || error} />)}
               <form className="mb-2" onSubmit={(e) => handleSubmit(e)}>
                   <div className="mb-3">
                       <label className="form-label">Email Address</label>
                       <input type="email" className="form-control" 
                        required 
                       value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
                   </div>
                   {/* <Link to="/verify-password" state={{email:"bnagari154@gmail.com"}}> */}
                   <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isDisabled}>Send an Email</button>
                   {/* </Link> */}
               </form>
               <hr />
               <p className="form-check-label text-center">
                <Link to="/login" className="text-decoration-none">Login
                   </Link>
               
               </p>       
             </div>
             </div>  
            
           
    </div>
    </div>
  );
}


