import React, { useState } from "react";
import { isLoggedIn } from "../auth/authentication";
import { toast } from "react-toastify";
import { createComment } from "../services/post-service";
import { Button, Card, CardBody, CardText, Col, Input, Row } from "reactstrap";

const Comment = ({ post, setPost }) => {
  const [comment, setComment] = useState({
    content: "",
  });

  const submitComment = () => {
    if (!isLoggedIn()) {
      toast.error("please login first for comment...");
      return;
    }
    if (comment.content.trim() === "") {
      return;
    }
    createComment(comment, post.id, post.user.id)
      .then((data) => {
        toast.success("Comment added...");
        setPost({
          ...post,
          comments: [...post.comments, data],
        });
        setComment({
          content: "",
        });
      })
      .catch((err) => {
        toast.error("Something wrong");
      });
  };
  return (
    <div>
      <Row className="container m-4">
        <Col
          md={{
            size: 9,
            offset: 1,
          }}
        >
          <h3>Comments ({post ? post.comments.length : 0})</h3>
          {post &&
            post.comments.map((c, index) => (
              <Card className="mt-2 border-0" key={index}>
                <CardBody>
                  <CardText>{c.content}</CardText>
                </CardBody>
              </Card>
            ))}
          <Card className="mt-2 border-0">
            <CardBody>
              <Input
                type="textarea"
                placeholder="Enter Comment here"
                value={comment.content}
                onChange={(event) =>
                  setComment({ content: event.target.value })
                }
              />
              <Button onClick={submitComment} className="mt-2">
                Comment
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Comment;
