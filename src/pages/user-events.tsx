import AttendingEventsPanel from "@/components/events/AttendingEventsPanel";
import CreatedEventsPanel from "@/components/events/CreatedEventsPanel";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { AppUser } from "@/types/types";
import { authService } from "@/utilities";
import { Container, Heading, Stack, useToast } from "@chakra-ui/react";
import { error } from "console";
import { useEffect, useState } from "react";

export default function UserEvents() {
  const { user: currentUser, appUser, refetchUser } = useCurrentUser();

  const toast = useToast();
  console.log(appUser);
  return (
    <Container maxW="6xl" p={6} minH="90vh">
      <Stack direction="column" spacing={6} rounded="xl" bg="gray.100" p={6}>
        <Heading as="h1" fontSize="3xl" fontWeight={500}>
          {`${appUser?.username}'s Created Events`}
        </Heading>
        <CreatedEventsPanel
          appUser={appUser ?? undefined}
          refetchUser={refetchUser}
        />
      </Stack>
      <Stack
        mt={8}
        direction="column"
        spacing={6}
        rounded="xl"
        bg="gray.100"
        p={6}
      >
        <Heading as="h2" fontSize="3xl" fontWeight={500}>
          {`${appUser?.username}'s Attending Events`}
        </Heading>
        <AttendingEventsPanel
          appUser={appUser ?? undefined}
          refetchUser={refetchUser}
        />
      </Stack>
    </Container>
  );
}
