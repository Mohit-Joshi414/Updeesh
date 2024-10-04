import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import { deletePostById, getPostsByUserId } from "../services/post-service";
import { getCurrentUser } from "../auth/authentication";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";
import usePostsByUser from "../hooks/usePostsByUser";
import InfiniteScroll from "react-infinite-scroll-component";
import { ShimmerContentBlock } from "react-shimmer-effects";

const DisplayUserPosts = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [post, setPost] = useState();
  useEffect(() => {
    setUser(getCurrentUser());

    // loadPosts();
  }, []);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    usePostsByUser(user.id, 3);

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
        <Row xs={1} sm={1} md={1} lg={1} xl={1}>
          {isLoading && (
            <>
              <ShimmerContentBlock
                title
                text
                cta
                thumbnailWidth={370}
                thumbnailHeight={370}
              />
              <ShimmerContentBlock
                title
                text
                cta
                thumbnailWidth={370}
                thumbnailHeight={370}
              />
              <ShimmerContentBlock
                title
                text
                cta
                thumbnailWidth={370}
                thumbnailHeight={370}
              />
            </>
          )}
          <InfiniteScroll
            dataLength={
              data?.pages?.reduce(
                (acc, page) => acc + page.content.length,
                0
              ) || 0
            } // Total items loaded
            next={fetchNextPage} // Trigger fetch for the next page
            hasMore={!!hasNextPage}
            loader={
              <h4 style={{ textAlign: "center", marginTop: "5px" }}>
                Loading More Posts...
              </h4>
            }
            endMessage={
              !isFetching && (
                <h5
                  style={{
                    textAlign: "center",
                    marginTop: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <b>Yay! You have seen it all</b>
                </h5>
              )
            }
            style={{ overflowX: "hidden" }}
          >
            {data?.pages?.map((group, i) => {
              return (
                <Fragment key={i}>
                  {group?.content?.map((postData) => (
                    <Col key={postData.id}>
                      {/* <Post post={postData} /> */}
                      <Post
                        post={postData}
                        parent="dashboard"
                        deletePost={deletePost}
                      />
                    </Col>
                  ))}
                </Fragment>
              );
            })}
          </InfiniteScroll>
        </Row>
        {/* <h2 className="mt-4">Published Posts</h2>
        <Row xs={1} sm={1} md={2} lg={2} xl={2}>
          {post?.content?.map((item) => {
            return (
              <Col key={item.id}>
                <Post post={item} parent="dashboard" deletePost={deletePost} />
              </Col>
            );
          })}
        </Row> */}
      </div>
    </BaseWithoutCategoryList>
  );
};

export default DisplayUserPosts;
