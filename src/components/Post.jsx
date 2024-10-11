import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
} from "reactstrap";
import { BASE_URL } from "../services/helper";
import { getCurrentUser, isLoggedIn } from "../auth/authentication";

const Post = ({
  post = { title: "This is title", content: "this is content" },
  parent = "",
  deletePost = "",
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUser(getCurrentUser());
  }, []);

  return (
    <Card className="my-2">
      <Row className="d-flex">
        <Col lg="6" sm="12">
          <CardImg
            alt="Card image cap"
            src={
              post.image_url.toLowerCase().startsWith("http")
                ? post.image_url
                : `${BASE_URL}/api/post/image/${post.image_url}`
            }
            style={{
              margin: "5px",
              maxWidth: "97%",
              minHeight: "200px",
              maxHeight: "250px",
            }}
            top
          />
        </Col>
        <Col lg="6" sm="12">
          <CardBody>
            <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
              {post.title}
            </CardTitle>
            {/* <CardText
              dangerouslySetInnerHTML={{
                __html: post?.content.substring(0, 100) + "...",
              }}
            ></CardText> */}
            <CardText>
              <small className="text-muted">
                Created at: {new Date(post.post_timestamp).toLocaleDateString()}
              </small>
            </CardText>
            <div className="container text-center">
              <Link
                className="btn btn-dark mt-2"
                to={"/post/" + post.title.split(" ").join("-") + "-" + post.id}
              >
                Read more
              </Link>

              {loggedIn &&
                user &&
                user.id === post.user.id &&
                parent === "dashboard" && (
                  <Button
                    color="danger"
                    className="ms-2 mt-2"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </Button>
                )}
              {loggedIn &&
                user &&
                user.id === post.user.id &&
                parent === "dashboard" && (
                  <Button
                    color="warning"
                    className="ms-2 mt-2"
                    tag={Link}
                    to={`/user-admin/updatePost/${post.id}`}
                  >
                    Update
                  </Button>
                )}
            </div>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default Post;
