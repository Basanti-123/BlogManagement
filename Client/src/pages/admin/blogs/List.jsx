import {Button, ButtonGroup, ButtonToolbar, Table } from "react-bootstrap";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { listBlogs, removeBlog } from "../../../slices/blogSlice";
import { useCallback, useEffect } from "react";
import dateFormatter from "../../../utils/date";

export const AdminBlogs = () => {
  const dispatch = useDispatch();
  const {
    blogs,
   currentPage:page, 
    limit,
    blog, 
  } = useSelector((state)=>state.blogs);
  const initFetch = useCallback(() => {
    dispatch(listBlogs({limit, page})) 
  },[dispatch, limit, page]);

  const handleRemove =(e, id) => {
    e.preventDefault();
    dispatch(removeBlog(id));
  }

  useEffect(() => {
    if (blog?.acknowledged) {
      initFetch ();
    }
  initFetch ();
  }, [initFetch, blog]);
 
  return (
<div className="container">
  <div className="flex d-flex justify-content-between">
    <div>
      <h2>Blogs</h2>
      </div>
    <div>
    <Link to="/admin/blogs/add" className="btn btn-danger">
      Add Blogs
    </Link>
    </div>
  </div>
  <div className="row">
    <div className="col">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Published Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {blogs.length> 0 ? (blogs.map((blog, idx) =>{
        return (
        <tr key={blog?.slug}>
        <td>{idx + 1}</td>
        <td>{blog?.title}</td>
        <td>{blog?.author}</td>
        <td>{dateFormatter(blog?.publishedDate)}</td>
        <td>{(blog?.status)}</td>
        <td>
          <ButtonToolbar>
          <ButtonGroup>
          
          <Link to = {`/admin/blogs/${blog?._id}`}
         
          className="btn btn-secondary"><i className="fa fa-eye"></i>
          </Link>
          </ButtonGroup>
          <ButtonGroup>
          <Button 
          className="btn btn-danger" onClick={(e)=> {handleRemove(e, blog?._id);}}>
          <i className="fa fa-trash"></i></Button>
          
          </ButtonGroup>
          </ButtonToolbar>
        </td>
      </tr>
        );
        })
       ):(
        <tr>
       <td colSpan={5} className="text-center">No Blogs</td>
       </tr> 
       )}
       
      </tbody>
    </Table>
    </div>
  </div>

</div>
  );
};
