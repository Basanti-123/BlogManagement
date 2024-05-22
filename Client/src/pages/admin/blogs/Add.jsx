import { useState, useEffect } from "react";
import { Button,ButtonGroup,ButtonToolbar,Form } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { createBlog } from "../../../slices/blogSlice";
import { Notify } from "../../../components/Notify";


export const AddBlog = () => {
  const dispatch = useDispatch();
  const {blog, error} = useSelector((state)=>state.blogs);


  const [preview, setPreview] = useState("")
  const [payload, setPayload] = useState({
    title: "",
    content: "",
   

  })

  const [img, setImg] = useState([])
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
  const formData = new FormData();
  formData.append("image", img[0]);
  formData.append("title", payload?.title);
  formData.append("content", payload?.content);
  dispatch(createBlog(formData));
  if (blog) {
    
    navigate("/admin/blogs");
  }
 
  }

  const handleFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
    setImg([...e.target.files]);
    
  }
}

  useEffect(() => {
    if(img.length > 0) {
      img.map((img) => {
        const objectUrl = URL.createObjectURL(img);
        setPreview(objectUrl);
      });
    }

  }, [img]);

  return (
    <>

    <div className='container'>
      <div className="row">
        <h2>Add new Blog </h2>
      </div>
      
       {error && < Notify variant={"danger"} msg={error}/>}

      <div className='row'>
      <Form 
      onSubmit={(e)=>{
        handleSubmit(e);
      }}
      >
      <Form.Group className="mb-3">
        {preview && <img src={preview} width="100" height="100"/>}
      </Form.Group>

      <Form.Group  className="mb-3">
        <Form.Label>Featured Image</Form.Label>
        <Form.Control type="file" onChange= {(e)=>handleFile(e)} />
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter your title" 
        value={payload?.title} 
        onChange={(e)=>{
          setPayload((prev)=> {
            return{...prev, title: e.target.value};
          })
        }}
        />
      </Form.Group>

      <Form.Group className="mb-3"  
      value={payload?.content} 
      onChange={(e)=>{
          setPayload((prev)=> {
            return{...prev, content: e.target.value};
          })
        }} >
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={8} />
      </Form.Group>

      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2">

      <Button type="submit">Submit</Button>
        </ButtonGroup>
 <ButtonGroup>
     
      <Link to="/admin/blogs" className="btn btn-danger">Go Back
      </Link>
      </ButtonGroup>
      </ButtonToolbar>
    </Form>
      </div>
    </div>

    </>
  )
  
}


