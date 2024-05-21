import ErrorImg from "../assets/img/android-chrome-512x512.png";
 export const Home = () => {
  return (
    <div className="">
      <svg xmlns="http://www.w3.org/2000/svg" className="d-none">

<symbol id="chevron-right" viewBox="0 0 16 16">
    <path fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 016 6a.5.5 0 0 1 0 .7081-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>


</symbol>

</svg>
  <div id="top"></div>
        {/* <!-- Jumbotron --> */}
        <div className="p-5 text-center bg-body-tertiary rounded-3">
            <h1 className="text-body-emphasis">How to be a good developer?</h1>
            <p className="col-lg-8 mx-auto fs-5 text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit....

            </p>
            <div className="d-inline-flex gap-2 mb-5">
                <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
                    Read more...
                    <a className="text-white icon-link gap-1 icon-link-hover text-decoration-none">
                        <svg className="bi ms-2" width="24" height="24">
                            <use xlinkHref="#chevron-right" />
                        </svg>
                    </a>
                </button>
                <button className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
                    Bookmark
                </button>
            </div>

        </div>
        {/* <!-- Featured --> */}
        <div className="row mt-4 ">
            <div className="col-md-6">
                <div className="card mb-3" style={{maxWidth: "540px"}}>
                    <div className="row g-0">
                        <div className="col-md-4">

                            <img src="https://c8.alamy.com/comp/2C1E5FX/beautiful-female-junior-developer-or-manager-working-on-laptop-in-it-office-sitting-at-table-in-meeting-room-of-a-software-development-company-or-2C1E5FX.jpg"
                                className="img-fluid " alt="image" 
                                onError={(e) =>(e.target.src=ErrorImg)} />
                        
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-body-secondary"><a href="#"
                                            className="icon-link gap-1 icon-link-hover stretched-link text-decoration-none">Counting
                                            reading
                                            <svg className="bi">
                                                <use xlinkHref="#chevron-right" />
                                            </svg>

                                        </a></small>
                                </p>
                            </div>
                        </div>
                        <div className="card-footer text-body-secondary">
                            <p className="card-text text-end"><small className="text-body-secondary">Last updated 3 mins
                                    ago</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-md-6 d-flex justify-content-end">
                <div className="card mb-3" style={{maxWidth: "540px"}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            {/* <!-- TODO --> */}
                            <img src="https://c8.alamy.com/comp/2C1E5FX/beautiful-female-junior-developer-or-manager-working-on-laptop-in-it-office-sitting-at-table-in-meeting-room-of-a-software-development-company-or-2C1E5FX.jpg"
                                className="img-fluid" alt="image" 
                                onError={(e) =>(e.target.src=ErrorImg)} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>

                                <p className="card-text"><small className="text-body-secondary"><a href="#"
                                            className="icon-link gap-1 icon-link-hover stretched-link text-decoration-none">Counting
                                            reading
                                            <svg className="bi">
                                                <use xlinkHref="#chevron-right" />
                                            </svg>

                                        </a></small>
                                </p>


                            </div>

                        </div>

                        <div className="card-footer text-body-secondary">
                            <p className="card-text text-end"><small className="text-body-secondary">Last updated 3 mins
                                    ago</small>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Row with 2 columns --> */}
        <div className="row mt-2">
            <div className="col-md-8">
                <div className="d-flex flex-row justify-content-between">
                    <h2>Popular Articles</h2>
                    <p> <a className="text-decoration-none" href="/blogs.html"> Show All</a> </p>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural
                                            lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins
                                                ago</small></p>
                                    </div>
                                </div>
                                <div className="col-md-3" style={{maxWidth: "540px"}}>
                                    <img src="https://c8.alamy.com/comp/2C1E5FX/beautiful-female-junior-developer-or-manager-working-on-laptop-in-it-office-sitting-at-table-in-meeting-room-of-a-software-development-company-or-2C1E5FX.jpg"
                                        className="img-fluid" alt="image"
                                        onError={(e) =>(e.target.src=ErrorImg)}/>
                                </div>

                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col">
                                    <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a
                                            natural lead-in to additional content. This content is a little bit longer.
                                        </p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins
                                                ago</small></p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <img src="https://c8.alamy.com/comp/2C1E5FX/beautiful-female-junior-developer-or-manager-working-on-laptop-in-it-office-sitting-at-table-in-meeting-room-of-a-software-development-company-or-2C1E5FX.jpg"
                                        className="img-fluid" alt="image"
                                        onError={(e) =>(e.target.src=ErrorImg)} />
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-md-4 ">
                <div className="row">
                    <h4 className="text-start">Author to watch for</h4>
                    <div className="col">
                        <div className="card border-0 mb-3" style={{maxWidth: "540px"}}>
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img src="https://c8.alamy.com/comp/2C1E5FX/beautiful-female-junior-developer-or-manager-working-on-laptop-in-it-office-sitting-at-table-in-meeting-room-of-a-software-development-company-or-2C1E5FX.jpg"
                                        className="img-fluid" alt="image"
                                        onError={(e) =>(e.target.src=ErrorImg)} />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title">Basanti Nagari</h5>
                                        <p className="card-text"> Frontend developer
                                        </p>

                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-body">
                                        <button className="btn btn-outline-secondary">Follow</button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 mb-3" style={{maxWidth: "540px"}}>
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img src="https://c8.alamy.com/comp/2C1E5FX/beautiful-female-junior-developer-or-manager-working-on-laptop-in-it-office-sitting-at-table-in-meeting-room-of-a-software-development-company-or-2C1E5FX.jpg"
                                        className="img-fluid" alt="image"
                                        onError={(e) =>(e.target.src=ErrorImg)} />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title">Basanti Nagari</h5>
                                        <p className="card-text"> Frontend developer
                                        </p>

                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-body">
                                        <button className="btn btn-outline-secondary">Follow</button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 mb-3" style={{maxWidth: "540px"}}>
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img src="https://c8.alamy.com/comp/2C1E5FX/beautiful-female-junior-developer-or-manager-working-on-laptop-in-it-office-sitting-at-table-in-meeting-room-of-a-software-development-company-or-2C1E5FX.jpg"
                                        className="img-fluid" alt="image"
                                        onError={(e) =>(e.target.src=ErrorImg)} />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title">Basanti Nagari</h5>
                                        <p className="card-text"> Frontend developer
                                        </p>

                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="card-body">
                                        <button className="btn btn-outline-secondary">Follow</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <a href="/authors.html" className="text-decoration-none text-danger-emphasis">Show more
                            suggestion</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


