import BaseWithoutCategoryList from "./BaseWithoutCategoryList";
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
import { toast } from "react-toastify";
import { createContactUs } from "../services/contactus-service";

const ContactUs = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    // console.log(event.target.value);
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    createContactUs(data)
      .then((res) => {
        console.log(res);
        console.log("Success");
        toast.success("Thanks for contacting us...");
        resetData();
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
    <div>
      <BaseWithoutCategoryList>
        <Card className="m-5">
          <div className="container mt-3 mb-3">
            <h2 className="mb-4">Contact US</h2>

            <Form onSubmit={(e) => submitForm(e)}>
              <FormGroup floating>
                <Input
                  id="username"
                  name="name"
                  placeholder="Name"
                  type="text"
                  onChange={(e) => handleChange(e, "name")}
                  value={data.name}
                  required
                  invalid={error.errors?.response?.data?.name ? true : false}
                />
                <FormFeedback>
                  {error.errors?.response?.data?.name}
                </FormFeedback>
                <Label for="username">Name</Label>
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
                <FormFeedback>
                  {error.errors?.response?.data?.email}
                </FormFeedback>
                <Label for="email">Email</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="subject"
                  type="text"
                  onChange={(e) => handleChange(e, "subject")}
                  value={data.subject}
                  required
                  invalid={error.errors?.response?.data?.subject ? true : false}
                />
                <FormFeedback>
                  {error.errors?.response?.data?.subject}
                </FormFeedback>
                <Label for="subject">Subject</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  id="message"
                  name="message"
                  placeholder="Tell me about yourself..."
                  type="textarea"
                  onChange={(e) => handleChange(e, "message")}
                  value={data.message}
                  required
                  invalid={error.errors?.response?.data?.message ? true : false}
                />
                <FormFeedback>
                  {error.errors?.response?.data?.message}
                </FormFeedback>
                <Label for="message">Tell us your thoughts</Label>
              </FormGroup>

              <Container className="text-center">
                <Button color="dark">Send</Button>
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
    </div>
  );
};

export default ContactUs;
