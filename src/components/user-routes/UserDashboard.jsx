import React from "react";
import { Button, Card, CardBody, Container } from "reactstrap";
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
