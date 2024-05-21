import BlogIcon from "../assets/img/android-chrome-192x192.png";
import { useState} from "react";
import { Link,useNavigate } from "react-router-dom";

import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/session";

import { Notify } from "../components/Notify";
//import { create } from "../../../Server/modules/blogs/blog.controller";
import { createUser } from "../utils/login";


export const Login =()=> {
  const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const[isDisabled, setIsDisabled] = useState(false);

    const handleSubmit = async (e)=>{
      try {
        e.preventDefault();
        setIsDisabled(true)
        const result = await instance.post(URLS.LOGIN, credentials);
        setToken(result.data.data)
        createUser();
        navigate("/admin");
      }  catch(e){
          setError(e?.response?.data?.msg || "Something went wrong");
      } finally {
        setIsDisabled(false)
        setTimeout(() => {
            setError("")
        }, 3000);
        setCredentials({email:"", password: ""})

      }

     };
  return (
    <div style={{minHeight:"25rem", background: "rgb(241,236,236)"}} >
    <div className="d-flex justify-content-center align-items-center min-vh-100">
   
       <div className="shadow card" style={{width: "25rem"}}>
        <div className="card-body">
            <h5 className="card-title text-center">
              <img src={BlogIcon} width="20%"
                    className="img-fluid" alt="Logo"/>
                <div className="h2 p-2">Login</div>
            </h5>
            {error &&<Notify variant="danger" msg={error} />}
            <form className="mb-2" onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email"
                    autoComplete="email" className="form-control" 
                    value={credentials.email}
                    onChange={(e)=>{setCredentials((prev)=>{return{...prev, email:e.target.value};
                })
                }}
                required />

                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" 
                    autoComplete="current-password" className="form-control" 
                    value={credentials.password}
                    onChange={(e)=>{setCredentials((prev)=>{return{...prev, password:e.target.value};
                })
                }}  required/>
                </div>
                <div className="mb-3 form-check">
                    <p className="form-check-label text-end"><Link to="/forget-password"
                            className="text-decoration-none">Forget Password?</Link> </p>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 " disabled={isDisabled}>Login</button>

            </form>
            <hr />
            <p className="form-check-label text-center"><Link to="/register" className="text-decoration-none">Register?
            </Link></p>
        </div>
    </div>
    </div>
    </div>
  )
}
