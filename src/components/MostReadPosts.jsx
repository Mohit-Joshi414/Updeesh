import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { BASE_URL } from "../services/helper";

const MostReadPosts = ({
  post = { title: "This is title", content: "this is content" },
}) => {
  return (
    <Row>
      <a
        style={{
          float: "left",
          margin: "5px",
          textDecoration: "none",
          color: "black",
        }}
        href="#"
      >
        <div style={{ float: "left", marginRight: "10px" }}>
          <img
            src={BASE_URL + "/api/post/image/" + post.image_url}
            alt="img"
            width="90px"
            height="90px"
          />
        </div>
        <div>
          <b>{post.title}</b>
        </div>
      </a>
    </Row>
  );
};

export default MostReadPosts;
