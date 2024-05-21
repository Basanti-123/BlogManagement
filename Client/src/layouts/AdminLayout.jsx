import React from 'react'

import {Outlet}from "react-router-dom";
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout = () => {
  return (
    <div>
    <div className="d-flex flex flex-row min-vw-100">
    <AdminNavbar />
    <main className='m-5 p-5' style={{minWidth:"75%"}}>
     <Outlet/>
     </main>
     </div>
    </div>
  );
}



