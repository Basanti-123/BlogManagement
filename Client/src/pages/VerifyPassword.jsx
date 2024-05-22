import BlogIcon from "../assets/img/android-chrome-192x192.png";
import { useState } from "react";
import { Link , useLocation, useNavigate} from "react-router-dom";

import instance from "../utils/api";
import { URLS } from "../constants";

import { Notify } from "../components/Notify";

export const VerifyPassword = () => {
  const navigate = useNavigate();
   const {state} = useLocation();
   const [payload, setPayload] = useState({
   email: state?.email,
   token: "",
   password: "",
   })

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      setIsDisabled(true)
      const result = await instance.post(URLS.VERIFY_FP, payload);
      if(result.data.data){
        setMsg(result.data.data);
        setTimeout(()=>{navigate("/login")}, 1500);
      }
      
    }  catch(e){
        setError(e?.response?.data?.msg || "Something went wrong");
    } finally {
      setIsDisabled(false)
      setTimeout(() => {
          setError("");
      }, 3000);
      setPayload({
      email: "",
      token: "",
      password: "",
      });

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
         <div className="h2 p-2">Verify-Password</div>
            </h5>
            {(msg || error) && (
               <Notify 
               variant={error?"danger": "success"} 
               msg={msg || error} />)}

            <form className="mb-2" onSubmit={(e)=>{handleSubmit(e);}}>
                <div className="mb-3" >
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" value= {payload?.email ||"user@example.com"} 
                    disabled/>

                </div>

                <div className="mb-3">
                    <label className="form-label">Token</label>
                    <input className="form-control" 
                    value={payload.token} 
                    onChange={(e)=>setPayload((prev)=>{
                     return {...prev, token:e.target.value};
                    })}/>

                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control" value={payload.password} 
                    onChange={(e)=>setPayload((prev)=>{
                     return {...prev, password:e.target.value};
                    })}/>

                </div>
                
                <button type="submit" className="btn btn-primary btn-lg w-100" disabled={isDisabled}>Reset Password</button>

            </form>
            <hr />
            <p className="form-check-label text-center"> <Link to="/login" className="text-decoration-none">Login
            </Link>
        </p>
                    
             </div>
             </div>  
            
           
    </div>
    </div>
  );
}


