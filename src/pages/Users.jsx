import { Table, Flex, Button, Box } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://66d7f04737b1cadd8052b9a2.mockapi.io/users"
      );
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const confirmation = confirm("Do you want to delete the user?");
      if (confirmation) {
        const response = await axios.delete(
          `https://66d7f04737b1cadd8052b9a2.mockapi.io/users/${id}`
        );
        fetchData();
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex style={{ marginLeft: "1.5rem" }}>
        <h1>
          Users Data{" "}
          <Link to={"/create-user"}>
            <Button style={{ margin: "0.5rem" }}>Create New User</Button>
          </Link>
        </h1>
      </Flex>
      <Box p={{ sm: "3", lg: "5" }}>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Company</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Website</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => (
              <Table.Row style={{ margin: "1rem" }} key={user.id}>
                <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                <Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <div>{user.address.street},</div>
                  <div>{user.address.suite},</div>
                  <div>{user.address.city},</div>
                  <div>{user.address.zipcode}.</div>
                </Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                <Table.Cell>{user.company}</Table.Cell>
                <Table.Cell>{user.website}</Table.Cell>
                <Table.Cell>
                  <Flex gap="2">
                    <Link to={`view-user/${user.id}`}>
                      <Button>View</Button>
                    </Link>
                    <Link to={`/edit-user/${user.id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      Delete
                    </Button>{" "}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </>
  );
}

export default Users;
