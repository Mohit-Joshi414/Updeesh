import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import usePosts from "../hooks/usePosts";
import { ShimmerContentBlock } from "react-shimmer-effects";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>
          Updeesh : Best Hindi Bhajan, Aarti, Katha, Mantra, Preyer, Chalisa,
          Prerak Kahaniyan - भक्ति भजन चालीसा व धार्मिक लेखों का संग्रह
        </title>
        <meta
          name="description"
          content="Updeesh is a well-known cultural information provider platform where is told about the timing, schedule, dates, rituals and beliefs of Hinduism, Jainism and Buddhism Mandir/Temples in the most effective manner. It includes all kinds of Festivals, Tithi, Aarti, Katha, Mantra, Preyer, Chalisa, Prerak Kahaniyan. Let's make a cultured India."
        />
        <meta
          name="keywords"
          content=" Hindi Bhajan, Aarti, Katha, Mantra, Preyer, Chalisa, Prerak Kahaniyan"
        />
        <link rel="canonical" href="https://updeesh.netlify.app/" />
        {/* Facebook tags */}
        <meta property="og:type" content="Article" />
        <meta
          property="og:title"
          content="Updeesh : Best Hindi Bhajan, Aarti, Katha, Mantra, Preyer, Chalisa,
          Prerak Kahaniyan - भक्ति भजन चालीसा व धार्मिक लेखों का संग्रह"
        />
        <meta
          property="og:description"
          content="Updeesh is a well-known cultural information provider platform where is told about the timing, schedule, dates, rituals and beliefs of Hinduism, Jainism and Buddhism Mandir/Temples in the most effective manner. It includes all kinds of Festivals, Tithi, Aarti, Katha, Mantra, Preyer, Chalisa, Prerak Kahaniyan. Let's make a cultured India."
        />
        {/* End Facebook tags */}
      </Helmet>
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
