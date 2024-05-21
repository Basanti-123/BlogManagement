import BlogIcon from "../assets/img/favicon-32x32.png";

export const Footer = () => {
  return (
    <footer className=" d-flex justify-content-between align-items-center py-3 my-4 border-top">
    <div className=" container col-md-4 d-flex align-items-center">
        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <img className="img-fluid" src={BlogIcon} width="30" height="24"/>
        </a>
        <span className="mb-3 mb-md-0 text-body-secondary">© 2024 Blogify, Inc</span>
    </div>

    <div
        className="container col-md-4 d-flex align-items-center align-self-center d-none d-md-block justify-content-center text-center">
        <a href="#top">Back to top</a>
    </div>

    <ul className="container col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          
         <span
          href="https://twitter.com" target="_blank" className="text-decoration-none"> 

          <i className="fa fa-twitter"></i>
           </span>
           </li>
        <li className="ms-3"> 
        <a href="https://github.com" target="_blank" className="text-dark">
          <i className = "fa fa-github"></i>
          </a>
          </li>
        <li className="ms-3">
           <a href="https://facebook.com" target="_blank">
            <i className='fa fa-facebook'></i>
            </a>
            </li>
            </ul>
            
</footer>
  )
}


