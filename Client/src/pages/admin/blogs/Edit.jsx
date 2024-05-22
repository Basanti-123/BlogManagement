import { Button, ButtonToolbar, ButtonGroup, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//import logoIcon from "../../assets/icons/android-chrome-192x192.png";
//import { BASE_URL } from "../../constants";
import { getBlog, updateBlog } from "../../../slices/blogSlice";
import { dateInput, dateOutput } from "../../../utils/date";
import { Notify } from "../../../components/Notify";

export const BlogEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const blogId = pathname.split("/")[3];

  const { blog, success, error } = useSelector((state) => state.blogs);

  const [payload, setPayload] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      slug,
      tags,
      image,
      words,
      createdAt,
      updatedAt,
      author,
      v,
      _id,
      ...rest
    } = payload;
    dispatch(updateBlog({ id: blogId, blog: rest }));
    // const result = await Response;
    console.log(success);

    // const result = await Response.data.data;
    // console.log(result);
    // if (result?.data?.acknowledged) {
    //   navigate("/admin/blogs");
    // }
  };

  // const handleSubmit =async (e) => {
  //   e.preventDefault();
  //   const {
  //     slug, tags, image, words, createdAt, updatedAt, author, v, _id, ...rest} = payload ;
  //   dispatch(updateBlog({ id: blogId, blog: rest }));

  //  };

  useEffect(() => {
    setPayload(blog);
  }, [blog]);

  useEffect(() => {
    dispatch(getBlog(blogId));
  }, [dispatch, blogId]);

  // const convertDate = (originalDate) => {
  //   var formattedDate = moment(originalDate).format(
  //     "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
  //   );
  //   return formattedDate;
  // };

  // const handleFile = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   console.log("file", file.name);
  //   setPayload((prevVal) => {
  //     return { ...prevVal, blogImage: file };
  //   });
  // };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* <Form.Group className="mb-3">
      
      </Form.Group> */}

        <Form.Group className="mb-3">
          {blog?.image && <img src={blog?.image} width="200" height="200" />}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your title"
            value={payload?.title}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={payload?.status}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, status: e.target.value };
              });
            }}
          >
            {/* <option>Open this select menu</option> */}
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Published Date</Form.Label>
          <Form.Control
            type="date"
            value={dateInput(payload?.publishedDate)}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, publishedDate: dateOutput(e.target.value) };
              });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            value={payload?.content}
            onChange={(e) => {
              setPayload((prev) => {
                return { ...prev, content: e.target.value };
              });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          {(error || success) &&
            ((error && <Notify variant="danger" msg={error} />) ||
              (success && <Notify variant="success" msg={success} />))}
        </Form.Group>

        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2">
            <Button type="submit">Submit</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Link to="/admin/blogs" className="btn btn-danger">
              Go Back
            </Link>
          </ButtonGroup>
        </ButtonToolbar>
      </Form>
    </div>
  );
};
