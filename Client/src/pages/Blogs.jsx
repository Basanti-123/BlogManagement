import { Paginate } from '../components/Pagination';
import{Link} from "react-router-dom";
import {useBlogContext } from "../context/BlogContext";
import { BlogLoading } from '../components/BlogLoading';
import { BASE_URL } from '../constants';
import dateFormatter from '../utils/date';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useDispatch } from "react-redux";
import { addBookmark } from '../slices/bookmarkSlice';


 export const Blogs = () => {
    const dispatch = useDispatch();
    const {data, error, loading, currentPage,setCurrentPage,limit,setLimit, setAuthor, setTitle,} = useBlogContext();
    const [search, setSearch] = useState("blog");
    const [value, setValue] = useState("")
   
    const debouncedSearchTerm = useDebounce(value, 500)

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setAuthor("");
        setTitle("");
        setValue("");
    };

    const handleSearchTerm = (e)=>{
      setValue(e.target.value);
       
    };

    useEffect(()=> {
        search === "author" 
        ? setAuthor(debouncedSearchTerm)
        :setTitle(debouncedSearchTerm);
    }, [debouncedSearchTerm, search, setAuthor, setTitle])

    if (error) return<>{error}</>;

  return (
    <div>
        <div id="top"></div>
<div className="row">
    <h2>Blogs</h2>
<div className="d-flex justify-content-between">
    <div className="col-md-4">
        <div className="input-group">
            <span className="input-group-text" id="basic-addon1">

           <select className='form-select form-select-sm' onChange={e=> handleSearch(e)} 
           value={search}>

            <option value="blog">
                Blog
            </option>
   
            <option value="author">
                Author
            </option>

           </select>
            </span>
            <input 
            className="form-control" 
            placeholder="Search Blog or Author..."
            value={value}
            onChange={(e)=>
            handleSearchTerm(e)
            }
            />
        </div>
    </div>

    <div className="col-md-2">
        <div className="input-group">
            <select className="form-select">
                <option selected>Sort By</option>
                <option value="1">Newest</option>
                <option value="2">Oldest</option>
            </select>
        </div>
    </div>

</div>
</div>


<div className="row mt-5">
    <div className="row justify-content-center">
        {loading && (
         <>
           {[1,2,3,].map((d, i) => (
            
            <BlogLoading key={i}/>
           ))}
            </>

       )}
       {data?.data && 
       data.data.length > 0 && 
       data.data.map((post) => {
        return  (
            <div className="col-md-3" key={post?._id}>
            <div className="card mb-4 box-shadow home-card h-md-250">
                <img 
                className="img-fluid card-img-top"
                 alt="Blue Flower"
                     style={{height: "300px", 
                     width: "100%",
                      display: "block"}}
                    src={
                    post?.image
                    // .includes("https")
                    // ? post?.image
                    // : BASE_URL.concat(post?.image)
                }
                onError={(e=>{e.target.src = 
                    "https://cdn.dummyjson.com/cache/150x150/bitter-16/cccccc-black/1961c1376e1d8312d5ed7dbda1463b1a.png"})}
                    data-holder-rendered="true"/>

                <div className="card-body">
                    <a href="#" className="text-decoration-none text-dark">
                        <h5 className="card-title text-underline "> 
                        <em>{post?.title}</em>
                        </h5>
                    </a>
                    <div className="card-text">
                        <i className="fa fa-user"></i> &nbsp; {post?.author} &nbsp;
                        <i className="fa fa-calendar"></i> &nbsp;
                         {dateFormatter(post?.createdAt)}
                    </div>
                    <br />
                    <p className="card-text"> {post?.content.slice(0,30).concat("...")}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link 
                            className="btn btn-sm btn-outline-secondary" to={`/blogs/${post?.slug}`}>Read More</Link>

                            <button className="btn btn-sm btn-outline-secondary" onClick={()=>{
                                dispatch(addBookmark (post));
                            }}>
                            Bookmark</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
       })
      }
   </div>
</div>
   <Paginate 
   limit={limit}
   total={data.total || 0}
  currentPage={currentPage} 
  setCurrentPage={setCurrentPage} 
  setLimit={setLimit}/>
    </div>
  )
}


