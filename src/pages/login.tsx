import { useLogin } from "@/hooks/auth/useLogin";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const toast = useToast();
  const { login } = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      login(username, password)
        .then((res) => router.push("/"))
        .catch((err) => {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };
  return (
    <Flex bg="secondary.100" h="100vh" align="center" justify="center">
      <Stack
        direction="column"
        spacing={6}
        bg="gray.100"
        p={10}
        as="form"
        onSubmit={handleSubmit}
        maxW="container.xl"
      >
        <Heading as="h1" size="2xl" fontSize="xl" fontWeight={400}>
          Login
        </Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            variant="outline"
            type="text"
            color="gray.900"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            variant="outline"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="green">
          Login
        </Button>
      </Stack>
    </Flex>
  );
}
