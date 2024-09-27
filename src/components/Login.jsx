import { useEffect, useState } from "react";
import Base from "./Base";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Card,
} from "reactstrap";
import { login } from "../services/user-service";
import { toast } from "react-toastify";
import { doLogin } from "../auth/authentication";
import { useNavigate } from "react-router-dom";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";
const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    errors: "",
    isError: false,
  });

  useEffect(() => {
    console.log("login called");
  }, []);
  const navigate = useNavigate();

  const handleChange = (event, property) => {
    // console.log(event.target.value);
    setLoginData({ ...loginData, [property]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginData);

    login(loginData)
      .then((res) => {
        console.log(res);

        //store login detail in local storage
        doLogin(res, () => {
          console.log("login details saved in localstorage.");
          //redirect after login
          navigate("/user-admin/dashboard");
        });
        toast.success("Login successful!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong please try later!!");
      });
  };

  const resetData = () => {
    setLoginData({
      username: "",
      password: "",
    });
  };

  return (
    <BaseWithoutCategoryList>
      <Card className="m-5">
        <div className="container mt-3 mb-3">
          <h2 className="mb-4">Login</h2>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                onChange={(e) => handleChange(e, "username")}
                value={loginData.username}
                required
              />
              <Label for="email">Email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="Password"
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => handleChange(e, "password")}
                value={loginData.password}
                required
              />
              <Label for="Password">Password</Label>
            </FormGroup>
            <Container className="text-center">
              <Button color="dark">Login</Button>
              <Button
                type="reset"
                color="dark"
                className="ms-3"
                onClick={resetData}
              >
                Reset
              </Button>
            </Container>
          </Form>
        </div>
      </Card>
    </BaseWithoutCategoryList>
  );
};

export default Login;
