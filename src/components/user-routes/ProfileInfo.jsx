import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../services/user-service";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { getCurrentUser } from "../../auth/authentication";
import BaseWithoutCategoryList from "../BaseWithoutCategoryList";
import { toast } from "react-toastify";

const ProfileInfo = () => {
  // const users = useContext(userContext);
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    setCurrentUser(getCurrentUser());

    getUserById(userId)
      .then((data) => {
        setUser({ ...data });
      })
      .catch((err) => {
        toast.error("Something wrong");
      });
  }, []);

  return (
    <div>
      <BaseWithoutCategoryList>
        <Container>
          <Row className="my-5">
            <Col md={{ size: "6", offset: 3 }} sm={{ size: "10", offset: 2 }}>
              <Card>
                {currentUser && userId ? (
                  currentUser.id === userId ? (
                    <CardBody>
                      <h3 className="text-center">User Profile Information</h3>
                      <Table>
                        <tbody>
                          <tr>
                            <td>Id</td>
                            <td>{user?.id}</td>
                          </tr>
                          <tr>
                            <td>Name</td>
                            <td>{user?.name}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{user?.email}</td>
                          </tr>
                          <tr>
                            <td>About</td>
                            <td>{user?.about}</td>
                          </tr>
                          <tr>
                            <td>Role</td>
                            <td>{user?.roles[0]?.name}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  ) : (
                    <h3>You wont see other user data</h3>
                  )
                ) : (
                  <h3>User Data is loading...</h3>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </BaseWithoutCategoryList>
    </div>
  );
};

export default ProfileInfo;
