import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import { deletePostById, getPostsByUserId } from "../services/post-service";
import { getCurrentUser } from "../auth/authentication";
import Base from "./Base";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";

const DisplayUserPosts = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [post, setPost] = useState();
  useEffect(() => {
    setUser(getCurrentUser());

    loadPosts();
  }, []);
  function loadPosts() {
    getPostsByUserId(user.id)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const deletePost = (postId) => {
    deletePostById(postId)
      .then((data) => {
        toast.success("Post deleted");
        loadPosts();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error...");
      });
  };
  return (
    <BaseWithoutCategoryList>
      <div className="container">
        <h2 className="mt-4">Published Posts</h2>
        <Row xs={1} sm={1} md={2} lg={3} xl={3}>
          {post?.content?.map((item) => {
            return (
              <Col>
                <Post
                  key={item.id}
                  post={item}
                  parent="dashboard"
                  deletePost={deletePost}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </BaseWithoutCategoryList>
  );
};

export default DisplayUserPosts;
