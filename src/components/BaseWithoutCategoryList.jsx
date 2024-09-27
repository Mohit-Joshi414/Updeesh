import React from "react";
import styles from "./Base.module.css";
import CustomNavibar from "./CustomNavibar";
import { Container } from "reactstrap";
import CustomFooter from "./CustomFooter";
const BaseWithoutCategoryList = ({
  title = "Welcome to our website",
  children,
}) => {
  return (
    <div className={styles.main}>
      <CustomNavibar />
      <Container>{children}</Container>
      <CustomFooter />
    </div>
  );
};

export default BaseWithoutCategoryList;
