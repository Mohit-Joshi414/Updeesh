import React, { useEffect, useState } from "react";
import Base from "./Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "./CategorySideMenu";
import { getPostsByCategory } from "../services/post-service";
import Post from "./Post";

const CategoryWise = () => {
  const { categoryId } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    console.log(categoryId);
    getPostsByCategory(categoryId, 0, 3)
      .then((data) => {
        console.log(data);
        setPost(data);
        console.log(post);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [categoryId]);
  return (
    <div>
      <Base>
        <Container>
          <Row>
            <Col md={2}>
              <CategorySideMenu />
            </Col>
            <Col md={10}>
              {post?.content?.map((item) => {
                return (
                  <div>
                    <Post key={item.id} post={item} />
                  </div>
                );
              })}
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default CategoryWise;
