import React, { useEffect, useState } from "react";
import { loadAllPost } from "../services/post-service";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import MostReadPosts from "./MostReadPosts";
import SideListCard from "./SideListCard";
import InfiniteScroll from "react-infinite-scroll-component";

const NewFeedCopy = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElement: "",
    pageNumber: "",
    pageSize: "",
    elementPresent: "",
    lastPage: false,
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 6) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }

    loadAllPost(pageNumber, pageSize)
      .then((data) => {
        console.log(data);
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElement: data.totalElement,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          elementPresent: data.elementPresent,
          lastPage: data.lastPage,
        });
        // window.scroll(0, 0);
      })
      .catch((err) => {
        toast.error("Error in loading posts");
      });
  };

  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid" color="#012230">
      <Row xs={1} sm={1} md={1} lg={1} xl={1}>
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
            <Col key={postData.id}>
              <Post post={postData} />
            </Col>
          ))}
        </InfiniteScroll>
      </Row>
      <hr />
      {/* <h3 className="mt-4">Most Read</h3>
      <Row xs={1} sm={1} md={2} lg={2} xl={3}>
        {postContent?.content?.map((postData) => (
          <Col key={postData.id} className="my-2">
            <MostReadPosts key={postData.id} post={postData} />
          </Col>
        ))}
      </Row>
      <hr /> */}
      {/* <SideListCard /> */}
      {/* <hr /> */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          aria-label="Page navigation example"
          size="md"
          className="text-center mt-6"
        >
          <PaginationItem
            disabled={postContent.pageNumber === 0}
            onClick={() => changePage(postContent.pageNumber - 1)}
          >
            <PaginationLink href="#" previous>
              Previous
            </PaginationLink>
          </PaginationItem>
          {[...Array(postContent.totalPages)].map((item, index) => (
            <PaginationItem
              key={index}
              active={postContent.pageNumber === index}
              onClick={() => {
                changePage(index, 6);
              }}
            >
              <PaginationLink href="#">{index + 1}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            disabled={postContent.lastPage}
            onClick={() => changePage(postContent.pageNumber + 1)}
          >
            <PaginationLink href="#" next>
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div> */}
    </div>
  );
};

export default NewFeed;
