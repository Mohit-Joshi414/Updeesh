import { Col, Row } from "reactstrap";
import styles from "../css/CustomFooter.module.css";
import { Link } from "react-router-dom";
import React from "react";

const CustomFooter = React.memo(() => {
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
              <Link to="/about">Updeesh team</Link>.❤️
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
});

export default CustomFooter;
