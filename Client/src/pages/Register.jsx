import BlogIcon from "../assets/img/android-chrome-192x192.png";
import { useState} from "react";
import { Link,useNavigate } from "react-router-dom";

import instance from "../utils/api";
import { URLS } from "../constants";


import { Notify } from "../components/Notify";

export const Register = () => {
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        phone:"",
        password: "",
        
    });
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const[isDisabled, setIsDisabled] = useState(false);

    const handleSubmit = async (e)=>{
      try {
        e.preventDefault();
        setIsDisabled(true) 
        const result = await instance.post(URLS.REGISTER, payload);
        if (result.data.data){
            setMsg(result.data.data);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
           
        }
       // console.log({result})

       
      }  catch(e){
          setError(e?.response?.data?.msg || "Something went wrong");
      } finally {
        setIsDisabled(false)
        
        setTimeout(() => {
            setError("")
            setMsg("")
        }, 3000);
        setPayload({
            name: "",
            email: "",
            phone: "",
            password: "",
    })
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
               <div className="h2 p-2">Register</div>
            </h5>
            {(msg || error) &&<Notify variant={error?"danger": "success"} msg={msg || error} />}
            <form className="mb-2" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input  className="form-control" placeholder="John Doe" 
                    value={payload.name}
                    autoComplete="name"
                     onChange={(e)=>
                    {setPayload((prev)=>
                    {return{...prev, name:e.target.value};
                })
                }}
                required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="john@gmail.com"
                     value={payload.email}
                     onChange={(e)=>{setPayload((prev)=>{return{...prev, email:e.target.value};
                })
                }}
              required/>

                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" placeholder="98XXXXXXX"
                     value={payload.phone}
                     onChange={(e)=>{setPayload((prev)=>
                    {return{...prev, phone:e.target.value};
                })
                }}
               required/>

                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" 
                     value={payload.password}
                     onChange={(e)=>{setPayload((prev)=>{return{...prev, password:e.target.value};
                })
                }}
                    required/>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 " disabled={isDisabled}>Sign Up</button>

            </form>
            <hr />
            <p className="form-check-label text-center"><Link to="/login" className="text-decoration-none">Login
            </Link>
        </p>   </div>
             </div>  
            
           
    </div>
    </div>
  );
}


