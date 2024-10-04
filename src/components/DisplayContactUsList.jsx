import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";
import { loadAllContactUs } from "../services/contactus-service";
import InfiniteScroll from "react-infinite-scroll-component";

const DisplayContactUsList = () => {
  const [contactUs, setContactUs] = useState({
    contactUs: [],
    totalPages: "",
    totalElement: "",
    pageNumber: "",
    pageSize: "",
    elementPresent: "",
    lastPage: false,
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    loadAllContactUs(pageNumber, pageSize)
      .then((data) => {
        setContactUs({
          contactUs: [...contactUs.contactUs, ...data.contactUs],
          totalPages: data.totalPages,
          totalElement: data.totalElement,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          elementPresent: data.elementPresent,
          lastPage: data.lastPage,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(currentPage + 1);
  };
  return (
    <BaseWithoutCategoryList>
      <div className="container">
        <Card className="mt-3 shadow">
          <CardBody>
            <h4>Contact us list</h4>

            <InfiniteScroll
              dataLength={5}
              next={changePageInfinite}
              hasMore={!contactUs.lastPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(contactUs.contactUs)}
                  {contactUs?.contactUs?.map((c, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.subject}</td>
                      <td>{c.message}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </InfiniteScroll>
          </CardBody>
        </Card>
      </div>
    </BaseWithoutCategoryList>
  );
};

export default DisplayContactUsList;
