import React, { useEffect, useState } from "react";
import Base from "./Base";
import { useParams } from "react-router-dom";
import { loadPostById } from "../services/post-service";
import { toast } from "react-toastify";
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
import { isLoggedIn } from "../auth/authentication";
import Comment from "./Comment";
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
import { ShimmerPostDetails, ShimmerPostItem } from "react-shimmer-effects";

const PostPage = () => {
  const { postId } = useParams();

  // const [post, setPost] = useState(null);
  // useEffect(() => {
  //   loadPostById(postId)
  //     .then((data) => {
  //       setPost(data);
  //       window.scroll(0, 0);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       toast.error("Error in loading post");
  //     });
  // }, [postId]);
  const {
    data: post,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = usePostById(postId);

  const printDate = (number) => {
    return new Date(number).toLocaleDateString();
  };

  return (
    <Base>
      <Container>
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
                    dangerouslySetInnerHTML={{ __html: post.content }}
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
                      hashtag={"#Updesh..."}
                    >
                      <FacebookIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </FacebookShareButton>

                    <TelegramShareButton
                      url={window.location.href}
                      hashtag={"#Updesh..."}
                    >
                      <TelegramIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={window.location.href}
                      hashtag={"#Updesh..."}
                    >
                      <WhatsappIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </WhatsappShareButton>
                    <LinkedinShareButton
                      url={window.location.href}
                      hashtag={"#Updesh..."}
                    >
                      <LinkedinIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </LinkedinShareButton>
                    <PinterestShareButton
                      url={window.location.href}
                      hashtag={"#Updesh..."}
                    >
                      <PinterestIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </PinterestShareButton>
                    <TwitterShareButton
                      url={window.location.href}
                      hashtag={"#Updesh..."}
                    >
                      <TwitterIcon
                        size={25}
                        round={true}
                        style={{ marginRight: "4px" }}
                      />
                    </TwitterShareButton>
                    <EmailShareButton
                      url={window.location.href}
                      hashtag={"#Updesh..."}
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
