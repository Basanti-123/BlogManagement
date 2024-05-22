export const BlogLoading = () => {
  return (  
     <div className="col-md-4">
            <div className="card mb-4 box-shadow home-card h-md-250">
                <img className="img-fluid card-img-top" alt="Blue Flower"
                    style={{height: "300px", width: "100%", display: "block"}}
                    src="https://cdn.dummyjson.com/cache/150x150/bitter-16/cccccc-black/1961c1376e1d8312d5ed7dbda1463b1a.png"
                    data-holder-rendered="true"/>
                <div className="card-body">
                    <a href="#" className="text-decoration-none text-dark">
                        <h5 className="card-title text-underline placeholder-glow"> 
                        <em>
                            <span
                                className="placeholder col-10">
                                    </span>
                                    </em>
                        </h5>
                    </a>
                    <div className="card-text placeholder-glow">
                        <i className="fa fa-user"></i> &nbsp;
                        <span className="placeholder col-4"></span>
                        &nbsp;
                        <i className="fa fa-calendar"></i> &nbsp;
                        <span className="placeholder col-4"></span>

                    </div>
                    <br />
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-10"></span>
                        <span className="placeholder col-10"></span>

                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <a className="btn btn-sm btn-outline-secondary" href="#">Read More</a>

                            <a className="btn btn-sm btn-outline-secondary" href="#">Bookmark</a>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
  )
}
