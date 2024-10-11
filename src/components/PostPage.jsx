import React, { useEffect, useState } from "react";
import Base from "./Base";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  Container,
} from "reactstrap";
import { BASE_URL } from "../services/helper";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import usePostById from "../hooks/usePostById";
import { ShimmerPostDetails } from "react-shimmer-effects";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";

const PostPage = () => {
  //post comes in form of postTitle-postId so we have to split this by "-" for getting postId
  const { postDetail } = useParams();
  const [postId, setPostId] = useState();
  useEffect(() => {
    const temp = postDetail?.split("-");
    setPostId(temp[temp?.length - 1]);
  }, [postDetail]);

  const { data: post, isLoading } = usePostById(postId);

  const printDate = (number) => {
    return new Date(number).toLocaleDateString();
  };
  const sanitizedContent = DOMPurify.sanitize(post?.content);
  return (
    <Base>
      <Container>
        <Helmet>
          <title>Updeesh {post?.title ? `: ${post.title}` : ""}</title>
          <meta
            name="description"
            content={`Updeesh ${post?.title ? `: ${post.title}` : ""}`}
          />
          <meta
            name="keywords"
            content=" Hindi Bhajan, Aarti, Katha, Mantra, Preyer, Chalisa, Prerak Kahaniyan"
          />
          <link rel="canonical" href={window.location.href} />
          {/* Facebook tags */}
          <meta property="og:type" content="Article" />
          <meta
            property="og:title"
            content={`Updeesh ${post?.title ? `: ${post.title}` : ""}`}
          />
          <meta
            property="og:description"
            content={`Updeesh ${post?.title ? `: ${post.title}` : ""}`}
          />
          {/* End Facebook tags */}
        </Helmet>
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            {isLoading && (
              <>
                <ShimmerPostDetails card cta variant="EDITOR" />
              </>
            )}
            {post && (
              <Card className="my-2 container">
                <CardTitle tag="h5" className="mt-4">
                  {post.title}
                </CardTitle>
                <hr />
                <CardImg
                  className="img-fluid mt-3 container text-center"
                  alt="Card image cap"
                  src={
                    post.image_url.toLowerCase().startsWith("http")
                      ? post.image_url
                      : `${BASE_URL}/api/post/image/${post.image_url}`
                  }
                  style={{
                    maxWidth: "500px",
                    height: "250px",
                    minWidth: "250px",
                  }}
                  top
                  width="100%"
                />

                <CardBody>
                  <CardText
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  ></CardText>
                  <hr />
                  <CardText>
                    <small className="text-muted">
                      Poseted By <b>{post.user.name}</b> on{" "}
                      <b>{printDate(post.post_timestamp)}</b>
                    </small>
                    {"         "}
                  </CardText>

                  <CardText
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FacebookShareButton
                      url={window.location.href}
                      hashtag={"#Updeesh..."}
                    >
                      <FacebookIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </FacebookShareButton>

                    <TelegramShareButton
                      url={window.location.href}
                      hashtag={"#Updeesh..."}
                    >
                      <TelegramIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={window.location.href}
                      hashtag={"#Updeesh..."}
                    >
                      <WhatsappIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </WhatsappShareButton>
                    <LinkedinShareButton
                      url={window.location.href}
                      hashtag={"#Updeesh..."}
                    >
                      <LinkedinIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </LinkedinShareButton>
                    <PinterestShareButton
                      url={window.location.href}
                      hashtag={"#Updeesh..."}
                    >
                      <PinterestIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </PinterestShareButton>
                    <TwitterShareButton
                      url={window.location.href}
                      hashtag={"#Updeesh..."}
                    >
                      <TwitterIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </TwitterShareButton>
                    <EmailShareButton
                      url={window.location.href}
                      hashtag={"#Updeesh..."}
                    >
                      <EmailIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </EmailShareButton>
                  </CardText>

                  {/* <Button disabled color="dark">
                    {post.categoryDto.title}
                  </Button> */}
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>

        {/* //Showing comment section only for login user by default it is set to disabled */}
        {/* {isLoggedIn() && <Comment post={post} setPost={setPost} />} */}
      </Container>
    </Base>
  );
};

export default PostPage;
