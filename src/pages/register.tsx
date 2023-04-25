import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { RegisterRequest } from "../types/types";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const toast = useToast();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  return (
    <Flex bg="secondary.100" minH="100vh" align="center" justify="center">
      <Stack
        direction="column"
        spacing={6}
        bg="gray.100"
        p={8}
        as="form"
        onSubmit={handleRegisterSubmit}
        maxW="container.4xl"
      >
        <Heading as="h1" fontSize="3xl" fontWeight={500}>
          Register
        </Heading>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            variant="outline"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            variant="outline"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            variant="outline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            variant="outline"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="primary">
          Register
        </Button>
      </Stack>
    </Flex>
  );

  function handleRegisterSubmit(e: any) {
    e.preventDefault();
    const registerRequest: RegisterRequest = {
      username,
      password,
      email,
      name,
    };
    axios
      .post(`${API_BASE_URL}/auth/register`, registerRequest)
      .then((res) => {
        toast({
          title: "Success",
          description: `Successfully registered user with username ${username}. Please login to continue.`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: `There was an error creating a user with entered credentials: ${err.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }
}
