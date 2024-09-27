import CustomFooter from "./CustomFooter";
import CustomNavibar from "./CustomNavibar";
import styles from "./Base.module.css";
import SideListCard from "./SideListCard";
import { Col, Container, Row } from "reactstrap";
import { categoryContext } from "../context/categoryContext";

const Base = ({ title = "Welcome to our website", children }) => {
  return (
    <div className={styles.main}>
      <CustomNavibar />
      <Container>
        <Row className="mt-3">
          <Col className="col-lg-8 col-md-7 col-sm-12 col-12">{children}</Col>
          <Col className="col-lg-4 col-md-5">
            <categoryContext.Consumer>
              {(postContent) => {
                return (
                  <>
                    {postContent?.map((post, index) => {
                      return (
                        post?.posts != 0 && (
                          <SideListCard key={index} post={post} />
                        )
                      );
                    })}
                  </>
                );
              }}
            </categoryContext.Consumer>
          </Col>
        </Row>
      </Container>
      <CustomFooter />
    </div>
  );
};

export default Base;
