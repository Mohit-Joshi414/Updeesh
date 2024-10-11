import React, { useState } from "react";
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
import { createCategory } from "../services/category-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";
const AddCategory = () => {
  const [category, setCategory] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const fieldChange = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const submitCategory = (event) => {
    event.preventDefault();
    createCategory(category)
      .then((data) => {
        toast.success("Category added successfully");
        navigate("/user-admin/dashboard");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const resetFeild = (e) => {
    alert("want to reset");
    e.preventDefault();
    setCategory({ title: "", description: "" });
  };

  return (
    <BaseWithoutCategoryList>
      <div className="wrapper container">
        <Card className="mt-3 mb-3 shadow">
          <CardBody>
            <h3 className="m-3">Add Category</h3>
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
                  Create Category
                </Button>
                <Button className="ms-3" onClick={(e) => resetFeild(e)}>
                  Reset
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    </BaseWithoutCategoryList>
  );
};

export default AddCategory;
