import {Outlet}from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
    <AppNavbar/>
    <main className="container" style={{paddingTop:"4.5 rem"}}>
     <Outlet/>
     </main>
     <Footer/>
    </>
  )
}

