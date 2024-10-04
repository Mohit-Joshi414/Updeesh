import React from "react";
import { Card, CardBody } from "reactstrap";
import styles from "./SideListCard.module.css";

import { Link } from "react-router-dom";

const SideListCard = ({ post }) => {
  return (
    <div>
      <Card className="col-12 my-2">
        <CardBody>
          <h4>
            <Link
              to={`/categoryWise/${post?.categoryId}`}
              className={styles.anchor}
            >
              {post?.categoryName}
            </Link>
          </h4>
          <hr />
          {post?.posts?.map((p) => (
            <p key={p.id}>
              <Link to={"/post/" + p.id} className={styles.anchor}>
                {p.title}
              </Link>
            </p>
          ))}

          <p>
            <Link
              to={`/categoryWise/${post?.categoryId}`}
              className={styles.anchor}
            >
              View More...
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default SideListCard;
