import { Routes, Route } from "react-router-dom"
import { Layout } from "./layouts/AppLayout"


import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import {  Blogs } from "./pages/Blogs";
import { Bookmark } from "./pages/Bookmark";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home"
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminBlogs } from "./pages/admin/blogs/List";
import { AddBlog } from "./pages/admin/blogs/Add";
import { BlogEdit } from "./pages/admin/blogs/Edit";
import { AdminUsers } from "./pages/admin/Users";
import { AdminProfile } from "./pages/admin/Profile";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgetPassword } from "./pages/ForgetPassword";
import { VerifyPassword } from "./pages/VerifyPassword";
import { PrivateRoute } from "./components/Routes";


export default function App() {
  
  return (
  <body >
   <Routes>
    {/* Normal User */}
   <Route path="/login" element = {<Login />} />
    <Route path="/register" element = {<Register/>} />
    <Route path="/forget-password" element = {<ForgetPassword />} />
    <Route path="/verify-password" element = {<VerifyPassword />} />

 {/* Normal User with Navbar */}
    <Route path="/" element={<Layout />}>
    <Route path="about" element={<About />} />
    <Route path="bookmarks" element={<Bookmark />} />
    <Route index element={<Home />} />
    <Route path="blogs" element={<Blogs/>} />
    <Route path="blogs/:id" element={<Blog />} />
    <Route path= "contact" element= {<Contact/>} />
    </Route>

    {/* Admin User */}

    <Route path="/admin" element={<AdminLayout />}>
    <Route 
    index 
    element={
    <PrivateRoute>
      <AdminBlogs />
      </PrivateRoute>
    } />
    <Route 
    path="blogs" 
    element={
    <PrivateRoute>
      <AdminBlogs />
    </PrivateRoute>} 
    />

<Route 
    path="blogs/add" 
    element={
    <PrivateRoute>
      <AddBlog />
    </PrivateRoute>} 
    />

<Route 
    path="blogs/:id" 
    element={
    <PrivateRoute>
      <BlogEdit />
    </PrivateRoute>
    } 
    />

    <Route
     path= "users" 
     element={
   <PrivateRoute role="admin">
    <AdminUsers /> 
   </PrivateRoute>
  } />
   
    <Route path= "profile" element= {<AdminProfile/>} />
    </Route>
    <Route path="*" element={<NotFound />} />
   </Routes>
    </body>
  )
}


