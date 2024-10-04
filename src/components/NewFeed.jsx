import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import usePosts from "../hooks/usePosts";
import { ShimmerContentBlock } from "react-shimmer-effects";

const NewFeed = () => {
  //Custom hook inside this we used useInfiniteQuery for fetching data
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    usePosts(3);

  if (isLoading) {
    return (
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
        <ShimmerContentBlock
          title
          text
          cta
          thumbnailWidth={370}
          thumbnailHeight={370}
        />
      </>
    );
  }
  return (
    <div className="container-fluid" color="#012230">
      <Row xs={1} sm={1} md={1} lg={1} xl={1}>
        <InfiniteScroll
          dataLength={
            data?.pages?.reduce((acc, page) => acc + page.content.length, 0) ||
            0
          } // Total items loaded
          next={fetchNextPage} // Trigger fetch for the next page
          hasMore={!!hasNextPage}
          loader={
            <h4 style={{ textAlign: "center", margin: "5px 0 10px 0" }}>
              Loading more posts...
            </h4>
          }
          endMessage={
            !isFetching && (
              <h5 style={{ textAlign: "center", margin: "5px 0 10px 0" }}>
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
                    {console.log(postData)}
                    <Post post={postData} />
                  </Col>
                ))}
              </Fragment>
            );
          })}
        </InfiniteScroll>
      </Row>
    </div>
  );
};

export default NewFeed;
