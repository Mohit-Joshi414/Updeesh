import React from "react";
import { Row } from "reactstrap";
import { BASE_URL } from "../services/helper";
import { Link } from "react-router-dom";

const MostReadPosts = ({
  post = { title: "This is title", content: "this is content" },
}) => {
  return (
    <Row>
      <Link
        style={{
          float: "left",
          margin: "5px",
          textDecoration: "none",
          color: "black",
        }}
        to="#"
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
      </Link>
    </Row>
  );
};

export default MostReadPosts;
