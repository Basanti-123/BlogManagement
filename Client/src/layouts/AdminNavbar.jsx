import BlogIcon from "../assets/img/android-chrome-192x192.png";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { removeToken, removeUser} from "../utils/session";
import { getUser } from "../utils/login";


export const AdminNavbar = () => {

const navigate = useNavigate();
  const {pathname} = useLocation();
  const currentPath = pathname.split("/")[2];
  const [user, setUser ] = useState({});

const handleLogOut = async() => {
  removeToken();
  removeUser();
  navigate("/login");
};

useEffect(() => {
  const user = JSON.parse(getUser());
  setUser(user);
}, []);

  return (
  <div className="col-md-2 h-100" style={{maxwidth:"400px"}}>
  <div className="d-flex flex-column p-3 text-bg-dark vh-100">

      <Link to="/admin"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <img src={BlogIcon} width="50" className="img-fluid mb-2"/>
          <span className="fs-4">Blogify</span>
      </Link>
      <hr/>
      <ul className="nav nav-pills flex-column mb-auto">
          <li>
              <Link to="/admin" className={`nav-link text-white ${!currentPath ? "active": ""}`}>
                  <i className="fa fa-dashboard"></i>&nbsp;
                  Dashboard
              </Link>
          </li>
          <li>
              <Link to="/admin/blogs" className={`nav-link text-white ${
                currentPath === "blogs" ? "active": " "}`}>
                  <i className="fa fa-book"></i>&nbsp;
                  Blogs
              </Link>
          </li>
          {user?.roles?.length>0 && user?.roles.includes("admin") && (
          <li>
              <Link to="/admin/users" className={`nav-link text-white ${currentPath === "users" ? "active": ""}`}>
                  <i className="fa fa-users"></i>&nbsp;
                  Users
              </Link>
          </li>
        )}
      </ul>
      <hr/>
      

<Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       <i className="fa fa-user-circle-o"></i>&nbsp;
                  
              <strong>{user?.name}</strong>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Link to="/admin/profile" className="dropdown-item">
          Profile
          </Link>
        <Dropdown.Divider/>
    <button
     className="dropdown-item" onClick={() => handleLogOut()}>Sign Out</button>
      </Dropdown.Menu>
    </Dropdown>
  </div>
</div>
 ) 
 
}


