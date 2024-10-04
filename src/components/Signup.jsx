import { useState } from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  Card,
  Container,
} from "reactstrap";
import { signup } from "../services/user-service";
import { toast } from "react-toastify";
import BaseWithoutCategoryList from "./BaseWithoutCategoryList";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleChange = (event, property) => {
    // console.log(event.target.value);
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    // console.log(data.password);
    // if (data.password.length < 4 || data.password.length >= 16) {
    //   console.log(data.password);
    //   setError({
    //     errors: "Password must be min 4 char & max 16 char",
    //     isError: true,
    //   });
    //   toast.error("Password must be min 4 char & max 16 char");
    // }

    // if (error.isError) {
    //   toast.error("Form data is invalid! Please recheck and submit again!");
    //   setError({ ...error, isError: false });
    //   return;
    // }
    signup(data)
      .then((res) => {
        console.log(res);
        console.log("Success");
        toast.success("User registered successfully!!");
      })
      .catch((err) => {
        console.log(err);
        console.error("error");
        setError({
          errors: err,
          isError: true,
        });
        // toast.error("Something wrong please try again!!");
      });
  };

  return (
    <BaseWithoutCategoryList>
      <Card className="m-5">
        <div className="container mt-3 mb-3">
          <h2 className="mb-4">Sign up</h2>

          <Form onSubmit={(e) => submitForm(e)}>
            <FormGroup floating>
              <Input
                id="username"
                name="name"
                placeholder="Username"
                type="text"
                onChange={(e) => handleChange(e, "name")}
                value={data.name}
                required
                invalid={error.errors?.response?.data?.name ? true : false}
              />
              <FormFeedback>{error.errors?.response?.data?.name}</FormFeedback>
              <Label for="username">Username</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                onChange={(e) => handleChange(e, "email")}
                value={data.email}
                required
                invalid={error.errors?.response?.data?.email ? true : false}
              />
              <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>
              <Label for="email">Email</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="Password"
                name="password"
                placeholder="Password"
                type="password"
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
                required
                invalid={error.errors?.response?.data?.password ? true : false}
              />
              <FormFeedback>
                {error.errors?.response?.data?.password}
              </FormFeedback>
              <Label for="Password">Password</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="about"
                name="about"
                placeholder="Tell me about yourself..."
                type="textarea"
                onChange={(e) => handleChange(e, "about")}
                value={data.about}
                required
                invalid={error.errors?.response?.data?.about ? true : false}
              />
              <FormFeedback>{error.errors?.response?.data?.about}</FormFeedback>
              <Label for="about">Tell me something about yourself</Label>
            </FormGroup>
            {/* <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input id="exampleSelect" name="select" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input id="exampleFile" name="file" type="file" />
            <FormText>
              This is some placeholder block-level help text for the above
              input. It‘s a bit lighter and easily wraps to a new line.
            </FormText>
          </FormGroup> */}
            <Container className="text-center">
              <Button color="dark">Signup</Button>
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

export default Signup;
