import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";
import { ShimmerTable } from "react-shimmer-effects";
import { toast } from "react-toastify";

const DisplayCategory = () => {
  const [modal, setModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggle = () => setModal(!modal);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setIsLoading(false);
        setCategories(data);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something wrong");
      });
  }, []);
  useEffect(() => {
    if (isDelete) {
      console.log("delete");
    } else {
      console.log("not");
    }
  }, [isDelete]);
  const handleDelete = (e, id) => {
    e.preventDefault();
    toggle();
    // deleteCategoryById(id)
    //   .then((data) => {
    //     toast.success("deleted successfully");
    //   })
    //   .catch((err) => {
    //     toast.error("something wrong happen");
    //   });
  };

  const deleteConfirmation = (isDelete) => {
    setIsDelete(isDelete);
    toggle();
  };

  return (
    <BaseWithoutCategoryList>
      <div className="container">
        <Card className="mt-3 shadow">
          <CardBody>
            <h4>Categories</h4>
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <>
                    <ShimmerTable row={5} col={2} />
                  </>
                )}
                {categories.map((c, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{c.title}</td>
                    <td>{c.description}</td>
                    <td>
                      <Button
                        color="warning"
                        tag={Link}
                        to={`/user-admin/updateCategory/${c.id}`}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        color="danger"
                        className="ms-3"
                        onClick={(e) => handleDelete(e, c.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalBody>Are you sure to delete category?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => deleteConfirmation(true)}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={() => deleteConfirmation(false)}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </BaseWithoutCategoryList>
  );
};

export default DisplayCategory;
