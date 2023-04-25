import AllUsersPanel from "@/components/events/AllUsersPanel";
import { AppUser } from "@/types/types";
import { getAuthorizationHeader } from "@/utilities/getAuthorizationHeader";
import { Container, Heading, useToast } from "@chakra-ui/react";
import axios, { AxiosHeaders } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function AllUsers() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const toast = useToast();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const fetchAllUsers = useCallback(async () => {
    const headers = {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    } as unknown as AxiosHeaders;

    axios
      .get(`${API_BASE_URL}/users`, { headers })
      .then((response) => {
        setUsers(response.data);
        console.log("USERS: ", response.data);
        toast({
          title: "Success",
          description: "Successfully fetched users.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `There was an error fetching users. ${error?.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [API_BASE_URL, toast]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <Container maxW="6xl" p={6} minH="90vh">
      <Heading as="h1" fontSize="3xl" fontWeight="500">
        All Users
      </Heading>
      <AllUsersPanel users={users} />
    </Container>
  );
}
