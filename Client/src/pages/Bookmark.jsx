import { Link } from "react-router-dom";
import { Paginate } from "../components/Pagination";

import{useDispatch, useSelector} from "react-redux";
import { removeBookmark, removeAll } from "../slices/bookmarkSlice";


export const Bookmark = () => {
  const dispatch = useDispatch();
  const {bookmarks} = useSelector((state) => state.bookmark);
  const data =bookmarks;
  return (
    <div style={{minHeight: "700px", paddingTop:"2rem"}}>
      <div id="top"></div>
      <h2 className="display-5 text-center">My Bookmarks</h2>
      <p className="lead text-center"> Your bookmarks are stored locally</p>

      <div className="container">
        <div className="row">
          <div className="col">
          <button className="btn btn-danger"onClick={()=> {dispatch(removeAll())}} >Remove all </button></div>
        </div>

      </div>

     <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>

            {data.length>0 ? (
              data.map((book, idx)=>{
              return (
              
              <tbody key={book?._id}>
              <tr>
                    <th scope="row">{idx+1}</th>
                    <td><Link to={`/blogs/`+ book?.slug} className="text-decoration-none">{book?.title} </Link></td>
                    <td>{book?.author}</td>
                    <td>
                    <button className="btn btn-danger" onClick={() => {dispatch(removeBookmark(book?._id))}}>
                    <i className="fa fa-trash"></i>
                    </button>
                    </td>
                </tr>
              </tbody>
              
             
              );
            })

            ) : (
              <NoBookmark/>
            )}

        </table> 
        {/* {data.length>0 && <Paginate/>} */}
    </div>
  );
}
const NoBookmark = () => {
  return (
    <>
    <tbody>
                <tr>
                    <td colSpan="4" className="text-center text-danger"> No Bookmark found. Add BookMark from 
                    <Link to="/blogs" className="text-decoration-none">&nbsp;here</Link>
                    
                    </td>

                </tr>
              </tbody>
    </>
  )
}
