import React, { useEffect, useState } from "react";
import { loadAllCategories } from "../services/category-service";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const CategorySideMenu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <ListGroup>
        <ListGroupItem
          key={0}
          action={true}
          className="mt-1 border-0 shadow-sm"
          tag={Link}
          to="/"
        >
          All Blogs
        </ListGroupItem>
        {categories &&
          categories.map((item, index) => {
            return (
              <ListGroupItem
                action={true}
                key={index}
                className="mt-1 border-0 shadow-sm"
                tag={Link}
                to={"/category/" + item.id}
              >
                {item.title}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default CategorySideMenu;
