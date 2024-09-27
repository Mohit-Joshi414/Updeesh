import React, { useEffect, useRef, useState } from "react";
import Base from "./Base";
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
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../auth/authentication";
import { loadPostById, uploadPostImage } from "../services/post-service";
import { toast } from "react-toastify";
import { updatePost } from "../services/post-service";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";

const UpdatePost = () => {
  const { postId } = useParams();
  const [categories, setCategories] = useState([]);

  const editor = useRef(null);
  const [user, setUser] = useState(getCurrentUser());

  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: -1,
  });

  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };
  useEffect(() => {
    setUser(getCurrentUser());
    console.log(user);
    loadPostById(postId)
      .then((data) => {
        setPost({ ...data });
        console.log(post);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in loading bloag data");
      });

    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const fieldChange = (event) => {
    console.log(event.target.value);
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentFieldChange = (data) => {
    setPost({ ...post, content: data });
  };

  const updatingPost = (event) => {
    event.preventDefault();
    console.log(post);

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
    updatePost(post)
      .then((data) => {
        console.log(data);

        if (image) {
          uploadPostImage(image, data.id)
            .then((data) => {
              toast.success("image uploaded");
            })
            .catch((err) => {
              toast.error("error in uploading image");
              console.log(err);
            });
        }

        toast.success("post updated");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <BaseWithoutCategoryList>
        <div className="wrapper">
          <Card className="mt-5 shadow">
            <CardBody>
              <h3 className="m-3">Update Post</h3>
              <Form onSubmit={updatingPost}>
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

                  {/* <Input
                id="content"
                name="content"
                placeholder="Enter your content..."
                type="textarea"
                style={{ height: "250px" }}
              /> */}
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
                  <Button className="ms-3">Reset</Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </div>
      </BaseWithoutCategoryList>
    </div>
  );
};

export default UpdatePost;
