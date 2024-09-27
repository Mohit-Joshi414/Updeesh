import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getCategoryById } from "../services/category-service";
import { updateCategory as categoryUpdate } from "../services/category-service";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    getCategoryById(categoryId)
      .then((data) => {
        setCategory({
          ["title"]: data.title,
          ["description"]: data.description,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const fieldChange = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const submitCategory = (event) => {
    event.preventDefault();
    categoryUpdate(categoryId, category)
      .then((data) => {
        navigate("/user-admin/dashboard");
        toast.success("Category updated successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="wrapper">
      <Card className="mt-3 mb-3 shadow">
        <CardBody>
          <h3 className="m-3">Update Category</h3>
          <Form onSubmit={(e) => submitCategory(e)}>
            <FormGroup floating>
              <Input
                id="title"
                name="title"
                placeholder="Enter category name here..."
                type="text"
                onChange={(e) => fieldChange(e)}
                value={category.title}
              />
              <Label for="title">Title</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="description"
                name="description"
                placeholder="Enter category description here..."
                type="text"
                onChange={(e) => fieldChange(e)}
                value={category.description}
              />
              <Label for="description">Description</Label>
            </FormGroup>
            <Container className="text-center">
              <Button type="submit" color="dark">
                Update Category
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateCategory;
