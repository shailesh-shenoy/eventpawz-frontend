import { AppUser } from "@/types/types";
import { SimpleGrid } from "@chakra-ui/react";
import UserCard from "./UserCard";

export default function AllUsersPanel({ users }: AllUsersPanelProps) {
  return (
    <SimpleGrid
      as="section"
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={4}
      p={4}
      mt={6}
      bg="whiteAlpha.800"
      color={"primary.900"}
    >
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
}

type AllUsersPanelProps = {
  users: AppUser[];
};
