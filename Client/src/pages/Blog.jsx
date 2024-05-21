import { Comment } from "../components/Comment";
import { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import useBlogs from "../hooks/useBlogs";
import dateFormatter from "../utils/date";
import {useBlogContext} from "../context/BlogContext";
import _ from "underscore"

export const Blog = () => {
    const { pathname } = useLocation();
    const slug = pathname.split("/")[2];
    const [detail, setDetail] = useState({});
    const { getBySlug } = useBlogs();
    const { data } = useBlogContext();
  
    useEffect(() => {
      const fetchBySlug = async () => {
        const data = await getBySlug(slug); 
        setDetail(data);
      };
      fetchBySlug();
    }, [slug, getBySlug]);
 // console.log({detail})
    const getUniqueBlog = (number = 3) => {
      const currentData = data?.data;
      const getUnique = currentData?.filter((data) => data.slug  !==slug);
      return _.sample(getUnique, number);
    };
  
    return (
      <>
        <div id="top"></div>
        <div className="row">
          <div className="col-md-9 mb40">
            <article className="d-flex flex flex-column">
              <div className="d-flex justify-content-center">
                <img src={detail?.image} style={{ width: "700px" }} alt="" className="img-fluid mb30" />
              </div>
  
              <nav aria-label="breadcrumb" className="mt-2">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
                  <li className="breadcrumb-item active"> <Link to="/blogs" className="text-decoration-none">Blogs </Link></li>
                  <li className="breadcrumb-item active"> <Link className="text-decoration-none">{detail?.title}</Link></li>
                </ol>
              </nav>
              <div className="post-content">
                <h1>{detail?.title}</h1>
                <ul className="post-meta list-inline">
                  <li className="list-inline-item">
                    <i className="fa fa-user-circle-o"></i>&nbsp;
                    <a href="#">{detail?.author?.name}</a>
                  </li>
                  <li className="list-inline-item">
                    <i className="fa fa-calendar-o"></i> &nbsp; <span>{dateFormatter(detail?.publishedDate)}</span>
                  </li>
                  <li className="list-inline-item">
                    <i className="fa fa-tags"></i>&nbsp; <span>{detail?.tags?.toString()}</span>
                  </li>
                </ul>
  
                <p className="lead">{detail?.content} </p>
              </div>
            </article>

            
          </div>
          <hr />
  
          <div className="comment">
            <Comment url={window.location.href} id={slug} title={slug} /> 
          </div>
  
          <h2 className="text-body-emphasis mt-5">Related Articles</h2>
          <div className="card-group">
            {getUniqueBlog()?.map(data => {
              return (
                <div key={data?._id} className="card">
                  <img src={data?.image} className="card-img-top" alt={data?.slug} />
                  <div className="card-body">
                    <h5 className="card-title">{data?.title}</h5>
                    <p className="card-text">{data?.content?.slice(0, 35).concat("...")}</p>
                    <p className="card-text"><small className="text-body-secondary">{dateFormatter(data?.publishedDate)}</small></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  