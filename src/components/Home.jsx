import { Col, Container, Row } from "reactstrap";
import Base from "./Base";
import NewFeed from "./NewFeed";
import CategorySideMenu from "./CategorySideMenu";
import st from "./SideListCard.module.css";
import SideListCard from "./SideListCard";
const Home = () => {
  return (
    <Base>
      <NewFeed />
      {/* <Container>
        <Row className="mt-3">
          {/* <Col md={2}>
            <CategorySideMenu />
          </Col> */}
      {/* <Col className="col-lg-8 col-md-7 col-sm-12 col-12">
            <NewFeed />
          </Col>
          <Col className="col-lg-4 col-md-5">
            <SideListCard />
            <SideListCard />
            <SideListCard />
            <SideListCard />
            <SideListCard />
          </Col>
        </Row>
      </Container> */}
    </Base>
  );
};

export default Home;
