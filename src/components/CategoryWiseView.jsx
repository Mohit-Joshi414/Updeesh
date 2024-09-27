import React, { useEffect, useState } from "react";
import {
  getPostsByCategory,
  getPostsTitleByCategory,
  loadAllPost,
} from "../services/post-service";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import Base from "./Base";
import { useParams } from "react-router-dom";
import SideListCard from "./SideListCard";
import InfiniteScroll from "react-infinite-scroll-component";

const CategoryWiseView = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    category: {},
    totalPages: "",
    totalElement: "",
    pageNumber: "",
    pageSize: "",
    elementPresent: "",
    lastPage: false,
  });

  const { categoryId } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    setPostContent({
      content: [],
      category: {},
      totalPages: "",
      totalElement: "",
      pageNumber: "",
      pageSize: "",
      elementPresent: "",
      lastPage: false,
    });
    setCurrentPage(0);
    getPostsByCategory(categoryId, 0, 3)
      .then((data) => {
        console.log("inside category id : " + data);
        setPostContent(data);
        window.scroll(0, 0);
      })
      .catch((err) => {
        toast.error("Error in loading posts");
      });
    // console.log("call");
    // changePage(0);
  }, [categoryId]);

  useEffect(() => {
    changePage(currentPage, 3);
  }, [currentPage]);
  const changePage = (pageNumber = 0, pageSize = 3) => {
    console.log(categoryId);
    getPostsByCategory(categoryId, pageNumber, pageSize)
      .then((data) => {
        console.log("inside current page: ");
        console.log(data);
        setPostContent({
          content: [...postContent?.content, ...data.content],
          category: data.category,
          totalPages: data.totalPages,
          totalElement: data.totalElement,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          elementPresent: data.elementPresent,
          lastPage: data.lastPage,
        });
      })
      .catch((err) => {
        toast.error("Error in loading posts");
      });
  };
  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(postContent.pageNumber + 1);
  };

  return (
    <Base>
      <div className="container main" color="#012230">
        <Container className="text-center">
          <h2>{postContent?.category?.title}</h2>
          <p>{postContent?.category?.description}</p>
        </Container>
        <hr />
        {/* <Row xs={1} sm={1} md={1} lg={1} xl={1}> */}
        <InfiniteScroll
          dataLength={postContent?.content?.length}
          next={changePageInfinite}
          hasMore={!postContent.lastPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          style={{ overflowX: "hidden" }}
        >
          {postContent?.content?.map((postData) => (
            // <Col key={postData.id}>
            <div key={postData.id}>
              <Post post={postData} />
            </div>

            // </Col>
          ))}
        </InfiniteScroll>

        {/* </Row> */}
      </div>
    </Base>
  );
};

export default CategoryWiseView;
