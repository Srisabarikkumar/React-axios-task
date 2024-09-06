import {
  Heading,
  Box,
  Card,
  Text,
  Flex,
  Avatar,
  Tabs,
  Container,
  Strong,
} from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewUser() {
  const params = useParams();
  const [user, setUser] = useState({});

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `https://66d7f04737b1cadd8052b9a2.mockapi.io/users/${params.id}`
      );
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Heading size="9" style={{ margin: "2rem" }} align={"center"}>
        User details
      </Heading>
      <Box>
        <Container size="2">
          <Flex justify="center">
            <Box width="100vw">
              <Card style={{ height: "75vh" }} variant="classic">
                <Flex
                  style={{
                    marginBottom: "1rem",
                    marginLeft: "2rem",
                    marginRight: "2rem",
                  }}
                  gap="9"
                  align="center"
                >
                  <Avatar
                    size="9"
                    radius="full"
                    fallback={!user.name ? null : user.name[0]}
                    color="indigo"
                  />
                  <div>
                    <Heading
                      style={{ marginBottom: "1rem" }}
                      as="div"
                      size="8"
                      weight="bold"
                    >
                      {user.name}
                    </Heading>
                    <Text>
                      <Strong>Username:</Strong> {user.username}
                    </Text>
                  </div>
                </Flex>
                <Tabs.Root defaultValue="account">
                  <Flex justify="center">
                    <Tabs.List>
                      <Tabs.Trigger value="address">Address</Tabs.Trigger>
                      <Tabs.Trigger value="work">Work</Tabs.Trigger>
                      <Tabs.Trigger value="contact">Contact</Tabs.Trigger>
                    </Tabs.List>
                  </Flex>

                  <Box pt="3">
                    <Flex justify="center">
                      <Tabs.Content
                        style={{ marginTop: "2rem" }}
                        value="address"
                      >
                        <Card>
                          <Flex direction="column">
                            {!user.address ? null : (
                              <Text size="4">
                                <Strong>Street:</Strong> {user.address.street}
                              </Text>
                            )}
                            {!user.address ? null : (
                              <Text size="4">
                                <Strong>Suite:</Strong> {user.address.suite}
                              </Text>
                            )}
                            {!user.address ? null : (
                              <Text size="4">
                                <Strong>City:</Strong> {user.address.city}
                              </Text>
                            )}
                            {!user.address ? null : (
                              <Text size="4">
                                <Strong>Zipcode:</Strong> {user.address.zipcode}
                              </Text>
                            )}
                          </Flex>
                        </Card>
                      </Tabs.Content>

                      <Tabs.Content style={{ marginTop: "2rem" }} value="work">
                        <Card>
                          <Text size="4">
                            <Strong>Company:</Strong> {user.company}
                          </Text>
                        </Card>
                      </Tabs.Content>

                      <Tabs.Content
                        style={{ marginTop: "2rem" }}
                        value="contact"
                      >
                        <Card>
                          <Flex direction="column">
                            <Text size="4">
                              <Strong>Email:</Strong> {user.email}
                            </Text>
                            <Text size="4">
                              <Strong>Phone:</Strong> {user.phone}
                            </Text>
                            <Text size="4">
                              <Strong>Website:</Strong> {user.website}
                            </Text>
                          </Flex>
                        </Card>
                      </Tabs.Content>
                    </Flex>
                  </Box>
                </Tabs.Root>
              </Card>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default ViewUser;
