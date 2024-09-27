import React, { useEffect, useState } from "react";
import Base from "../Base";
import AddPost from "../AddPost";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { getCurrentUser } from "../../auth/authentication";
import { deletePostById, getPostsByUserId } from "../../services/post-service";
import CategorySideMenu from "../CategorySideMenu";
import Post from "../Post";
import { toast } from "react-toastify";
import AddCategory from "../AddCategory";
import DisplayUserPosts from "../DisplayUserPosts";
import { Link } from "react-router-dom";
import BaseWithoutCategoryList from "../BaseWithoutCategoryList";

const UserDashboard = () => {
  return (
    <div>
      <BaseWithoutCategoryList>
        <Container>
          <Card className="mt-4 container text-center">
            <CardBody>
              <h3 className="mb-3">Dashboard</h3>
              <Button
                className="me-2 mb-2"
                color="dark"
                tag={Link}
                to={"/addPost"}
              >
                Add Post
              </Button>
              <Button
                className="me-2 mb-2"
                color="dark"
                tag={Link}
                to={"/displayUserPosts"}
              >
                Display Posts
              </Button>
              <Button
                className="me-2 mb-2"
                color="dark"
                tag={Link}
                to="/addCategory"
              >
                Add Category
              </Button>
              <Button
                className="me-2 mb-2"
                color="dark"
                tag={Link}
                to="/displayCategory"
              >
                Display Category
              </Button>
              <Button
                className=" mb-2"
                color="dark"
                tag={Link}
                to="/user-admin/displayContactUs"
              >
                Display Contact Us
              </Button>
            </CardBody>
          </Card>
        </Container>
      </BaseWithoutCategoryList>
    </div>
  );
};

export default UserDashboard;
