import { AppUser } from "@/types/types";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function UserCard({ user }: UserCardProps) {
  const defaultUserImage = "/default-user.jpg";
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  return (
    <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <CardHeader p="6">
        <Flex alignItems="center">
          <Avatar size="md" name={user.username} bg="primary.300" />
          <Box ml="4">
            <Text fontSize="lg" fontWeight="bold">
              {user.username}
            </Text>
            <Text fontSize="sm">{user.email}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <Image
          h="300px"
          w="300px"
          objectFit="cover"
          src={user.avatar ? `${API_HOST}/${user.avatar}` : defaultUserImage}
          fallbackSrc={defaultUserImage}
          alt="User Avatar"
          gridColumn={{ base: "span 1", md: "span 2" }}
        />
        <Text fontSize="lg" fontWeight={400}>
          {user.name}
        </Text>
        <Stack direction="column" mt={4}>
          <Badge colorScheme="blue" variant="subtle" fontSize="sm" p={2}>
            {user.role}
          </Badge>
          <Badge colorScheme="primary" variant="subtle" fontSize="sm" p={2}>
            {user.createdEvents?.length || 0} events created
          </Badge>
          <Badge colorScheme="green" variant="subtle" fontSize="sm" p={2}>
            {user.attendedEvents?.length || 0} events attending
          </Badge>
        </Stack>
      </CardBody>
    </Card>
  );
}

type UserCardProps = {
  user: AppUser;
};
