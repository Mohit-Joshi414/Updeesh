import { Col, Row } from "reactstrap";
import styles from "../css/CustomFooter.module.css";
import { Link } from "react-router-dom";

const CustomFooter = () => {
  // var style = {
  //   backgroundColor: "#333741",
  //   borderTop: "1px solid #E7E7E7",
  //   textAlign: "center",
  //   position: "absolute",
  //   left: "0",
  //   bottom: "0",
  //   height: "60px",
  //   width: "100vw",
  // };
  return (
    <div className={styles.footer}>
      <footer>
        <Row>
          <Col className="col-xs-12 container text-center">
            <Link
              className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none"
              to="/"
              aria-label="Bootstrap"
            >
              <img
                alt="logo"
                src={require("../updesh_logo-removebg-preview.png")}
                style={{
                  height: 40,
                  width: 100,
                }}
              />
            </Link>
            <p className="mb-2" style={{ color: "#fff" }}>
              ❤️Designed and built with all the love in the world by the{" "}
              <Link to="/about">Updesh team</Link>.❤️
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="container text-center">
            <a href="/" className="styles.a">
              Home
            </a>
          </Col>
          <Col className="container text-center">
            <a href="/contact">Contact us</a>
          </Col>
          <Col className="container text-center">
            <a href="/about">About</a>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default CustomFooter;
