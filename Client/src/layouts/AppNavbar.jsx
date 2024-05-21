
import {Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import BlogIcon from "../assets/img/android-chrome-192x192.png";
import { useState } from "react";


export const AppNavbar = () => {
  const {quantity} = useSelector((state) => state.bookmark);
  


  return (
    <Navbar className="navbar navbar-expand-md border-bottom border-body fixed-top"
    bg="dark"
    data-bs-theme="dark">

    <div className="container-fluid">

        <Link className="navbar-brand" to="/"> <img src={BlogIcon} alt="Blogify" width="30"
                height="25" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact Us</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About Us</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/blogs">Blogs</Link>
                </li>
            </ul>
            <div>  
              <Link to="/login">
            <button type="button" className="btn btn-outline-light">
              <i className="fa fa-sign-in"></i>
            </button>
            </Link>
            <Link to="/bookmarks">
                <button type="button" className="btn btn-outline-light m-1 ">
                  <i className="fa fa-bookmark"></i> {quantity}
                  </button>
              </Link>
            </div>

        </div>
    </div>
</Navbar>
  )
}


