import React, { Fragment, useEffect, useState } from "react";
import { Col, Container } from "reactstrap";
import Post from "./Post";
import Base from "./Base";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import usePostsByCategory from "../hooks/usePostsByCategory";
import { ShimmerContentBlock } from "react-shimmer-effects";

const CategoryWiseView = () => {
  //category comes in form of categoryName-categoryId so we have to split this by "-" for getting categoryId
  const { categoryDetail } = useParams();
  const [categoryId, setCategoryId] = useState();
  useEffect(() => {
    const temp = categoryDetail?.split("-");
    setCategoryId(temp[temp?.length - 1]);
  }, [categoryDetail]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    usePostsByCategory(categoryId, 3);
  const categoryInfo = data?.pages?.[0]?.category || {};

  const { title, description } = categoryInfo;

  return (
    <Base>
      <div className="container main" color="#012230">
        <Container className="text-center">
          <h2>{title}</h2>
          <p>{description}</p>
        </Container>
        <hr />
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
              (acc, page) => acc + page?.content?.length,
              0
            ) || 0
          } // Total items loaded
          next={fetchNextPage} // Trigger fetch for the next page
          hasMore={!!hasNextPage}
          loader={
            <h4 style={{ textAlign: "center", margin: "5px 0 10px 0" }}>
              Loading More Posts...
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
                    <Post post={postData} />
                  </Col>
                ))}
              </Fragment>
            );
          })}
        </InfiniteScroll>
      </div>
    </Base>
  );
};

export default CategoryWiseView;
