import { useFormik } from "formik";
import { Container, Flex, TextField, Text, Button } from "@radix-ui/themes";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditUser() {
  const params = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
      phone: "",
      website: "",
      company: "",
    },
    validate: (values) => {
      const error = {};

      if (values.name === "") {
        error.name = "Please enter your name";
      }

      if (values.username === "") {
        error.username = "Please enter your username";
      }

      if (values.email === "") {
        error.email = "Please enter a valid email";
      }

      if (values.address.street === "") {
        error.address.street = "Please enter the street name";
      }

      if (values.address.suite === "") {
        error.address.suite = "Please enter the suite";
      }

      if (values.address.city === "") {
        error.address.city = "Please enter the city";
      }

      if (values.address.zipcode === "") {
        error.address.zipcode = "Please enter the zipcode";
      }

      if (values.phone === "") {
        error.phone = "Please enter a valid phone number";
      }

      if (values.company === "") {
        error.company = "Please enter a valid company name";
      }

      if (values.website === "") {
        error.website = "Please enter a valid website";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `https://66d7f04737b1cadd8052b9a2.mockapi.io/users/${params.id}`,
          values
        );
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  let getData = async () => {
    try {
      const userResp = await axios.get(
        `https://66d7f04737b1cadd8052b9a2.mockapi.io/users/${params.id}`
      );
      formik.setValues(userResp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="500px">
      <h1>Update User</h1>
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="4">
          <div>
            <label>Name :</label>
            <TextField.Root
              placeholder="Enter your name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              size="3"
              type="text"
              style={{ marginTop: "0.5rem" }}
            />
            <span>
              <Text color="red">{formik.errors.name}</Text>
            </span>
          </div>
          <div>
            <label>Username :</label>
            <TextField.Root
              placeholder="Enter your username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              size="3"
              type="text"
              style={{ marginTop: "0.5rem" }}
            />
            <span>
              <Text color="red">{formik.errors.username}</Text>
            </span>
          </div>
          <div>
            <label>Email :</label>
            <TextField.Root
              placeholder="Enter your email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              size="3"
              type="email"
              style={{ marginTop: "0.5rem" }}
            />
            <span>
              <Text color="red">{formik.errors.email}</Text>
            </span>
          </div>
          <Flex gap="4">
            <div>
              <label>Address :</label>
            </div>
            <div>
              <div>
                <label>Street</label>
                <TextField.Root
                  placeholder="Enter the street"
                  name="address.street"
                  value={formik.values.address.street}
                  onChange={formik.handleChange}
                  size="3"
                  type="text"
                  style={{ marginTop: "0.5rem" }}
                />
                <span>
                  <Text color="red">
                    {!formik.errors.address
                      ? null
                      : formik.errors.address.street}
                  </Text>
                </span>
              </div>
              <div>
                <label>Suite</label>
                <TextField.Root
                  placeholder="Enter the suite"
                  name="address.suite"
                  value={formik.values.address.suite}
                  onChange={formik.handleChange}
                  size="3"
                  type="text"
                  style={{ marginTop: "0.5rem" }}
                />
                <span>
                  <Text color="red">
                    {!formik.errors.address
                      ? null
                      : formik.errors.address.suite}
                  </Text>
                </span>
              </div>
              <div>
                <label>City</label>
                <TextField.Root
                  placeholder="Enter your city"
                  name="address.city"
                  value={formik.values.address.city}
                  onChange={formik.handleChange}
                  size="3"
                  type="text"
                  style={{ marginTop: "0.5rem" }}
                />
                <span>
                  <Text color="red">
                    {!formik.errors.address ? null : formik.errors.address.city}
                  </Text>
                </span>
              </div>
              <div>
                <label>Zipcode</label>
                <TextField.Root
                  placeholder="Enter your zipcode"
                  name="address.zipcode"
                  value={formik.values.address.zipcode}
                  onChange={formik.handleChange}
                  size="3"
                  type="text"
                  style={{ marginTop: "0.5rem" }}
                />
                <span>
                  <Text color="red">
                    {!formik.errors.address
                      ? null
                      : formik.errors.address.zipcode}
                  </Text>
                </span>
              </div>
            </div>
          </Flex>
          <div>
            <label>Phone :</label>
            <TextField.Root
              placeholder="Enter your phone number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              size="3"
              type="text"
              style={{ marginTop: "0.5rem" }}
            />
            <span>
              <Text color="red">{formik.errors.phone}</Text>
            </span>
          </div>
          <div>
            <label>Website :</label>
            <TextField.Root
              placeholder="Enter your website address"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              size="3"
              type="text"
              style={{ marginTop: "0.5rem" }}
            />
            <span>
              <Text color="red">{formik.errors.website}</Text>
            </span>
          </div>
          <div>
            <label>Company :</label>
            <TextField.Root
              placeholder="Enter your company name"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              size="3"
              type="text"
              style={{ marginTop: "0.5rem" }}
            />
            <span>
              <Text color="red">{formik.errors.company}</Text>
            </span>
          </div>
        </Flex>
        <Flex style={{ marginTop: "1rem" }} gap="3" justify="end">
          <Button type="submit">Update</Button>
          <Link to={"/"}>
            <Button>Cancel</Button>
          </Link>
        </Flex>
      </form>
    </Container>
  );
}

export default EditUser;
