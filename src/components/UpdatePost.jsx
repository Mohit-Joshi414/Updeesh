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
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../auth/authentication";
import { loadPostById, uploadPostImage } from "../services/post-service";
import { toast } from "react-toastify";
import { updatePost } from "../services/post-service";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";
import { categoryListContext } from "../context/categoryContext";

const UpdatePost = () => {
  const { postId } = useParams();

  const editor = useRef(null);
  const [user, setUser] = useState(getCurrentUser());

  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: -1,
    image_url: "",
  });

  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };
  useEffect(() => {
    setUser(getCurrentUser());
    loadPostById(postId)
      .then((data) => {
        setPost({ ...data });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error in loading bloag data");
      });
  }, []);

  const fieldChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const contentFieldChange = (data) => {
    setPost({ ...post, content: data });
  };

  const updatingPost = (event) => {
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
    console.log(post);
    updatePost(post)
      .then((data) => {
        if (image) {
          uploadPostImage(image, data.id)
            .then((data) => {
              toast.success("image uploaded");
            })
            .catch((err) => {
              toast.error("error in uploading image");
              console.error(err);
            });
        }

        toast.success("post updated");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        navigate("/user-admin/dashboard");
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
                <FormGroup floating>
                  <Input
                    id="image_url"
                    name="image_url"
                    placeholder="Enter title here..."
                    type="text"
                    onChange={(e) => fieldChange(e)}
                    value={post.image_url}
                  />
                  <Label for="image_url">Paste link of banner image</Label>
                </FormGroup>
                <Label for="category">Category</Label>
                <categoryListContext.Consumer>
                  {(categories) => {
                    return (
                      <>
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
                            {categories?.map((category) => (
                              <option value={category.id} key={category.id}>
                                {category.title}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </>
                    );
                  }}
                </categoryListContext.Consumer>
                <Container className="text-center">
                  <Button type="submit" color="dark">
                    Update Post
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
