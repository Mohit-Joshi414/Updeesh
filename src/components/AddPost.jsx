import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import {
  createPost as doCreatePost,
  getPostsByUserId,
  uploadPostImage,
} from "../services/post-service";
import { getCurrentUser } from "../auth/authentication";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Base from "./Base";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";

const AddPost = () => {
  const [categories, setCategories] = useState([]);

  const editor = useRef(null);
  const [user, setUser] = useState(undefined);

  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: -1,
  });

  const [image, setImage] = useState(null);

  //handle image upload
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    setUser(getCurrentUser());

    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const fieldChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentFieldChange = (data) => {
    setPost({ ...post, content: data });
  };

  const createPost = (event) => {
    event.preventDefault();

    if (post.title.trim() === "") {
      alert("post title is required");
      return;
    }
    if (post.content.trim() === "") {
      alert("post Content is required");
      return;
    }
    if (post.categoryId === -1) {
      alert("post category is required");
      return;
    }

    //submit form
    post["userId"] = user.id;
    doCreatePost(post)
      .then((data) => {
        uploadPostImage(image, data.id)
          .then((data) => {
            toast.success("image uploaded");
          })
          .catch((err) => {
            toast.error("error in uploading image");
            console.log(err);
          });

        toast.success("post created");
        navigate("/user-admin/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetFeild = (e) => {
    alert("want to reset");
    e.preventDefault();
    setPost({ title: "", content: "", categoryId: -1 });
  };

  return (
    <BaseWithoutCategoryList>
      <div className="wrapper container">
        <Card className="mt-3 shadow">
          <CardBody>
            <h3 className="m-3">What's going in your mind?</h3>
            <Form onSubmit={createPost}>
              <FormGroup floating>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter title here..."
                  type="text"
                  onChange={(e) => fieldChange(e)}
                  value={post.title}
                />
                <Label for="title">Title</Label>
              </FormGroup>
              <Label for="content">Content</Label>
              <FormGroup floating>
                <JoditEditor
                  ref={editor}
                  name="content"
                  value={post.content}
                  onChange={contentFieldChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="image">Select banner image</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={handleFileChange}
                ></Input>
              </FormGroup>
              <Label for="category">Category</Label>
              <FormGroup>
                <Input
                  id="category"
                  name="categoryId"
                  type="select"
                  onChange={(e) => fieldChange(e)}
                  value={post.categoryId}
                >
                  <option disabled value={-1}>
                    Select
                  </option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <Container className="text-center">
                <Button type="submit" color="dark">
                  Create Post
                </Button>
                <Button className="ms-3" onClick={(e) => resetFeild(e)}>
                  Reset
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
        <hr />
      </div>
    </BaseWithoutCategoryList>
  );
};

export default AddPost;
