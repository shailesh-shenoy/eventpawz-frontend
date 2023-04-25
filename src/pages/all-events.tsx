import AllEventsPanel from "@/components/events/AllEventsPanel";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { Event } from "@/types/types";
import { getAuthorizationHeader } from "@/utilities/getAuthorizationHeader";
import { Container, Heading, useToast } from "@chakra-ui/react";
import axios, { AxiosHeaders } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function AllEvents() {
  const { user: currentUser, appUser, refetchUser } = useCurrentUser();
  const toast = useToast();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const [events, setEvents] = useState<Event[]>([]);

  const fetchAllEvents = useCallback(async () => {
    const headers = {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    } as unknown as AxiosHeaders;

    axios
      .get(`${API_BASE_URL}/events`, { headers })
      .then((response) => {
        setEvents(response.data);
        toast({
          title: "Success",
          description: "Successfully fetched events.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `There was an error fetching events. ${error?.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [API_BASE_URL, toast]);

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  return (
    <Container maxW="6xl" p={6} minH="90vh">
      <Heading as="h1" fontSize="3xl" fontWeight="500">
        Browse all events
      </Heading>
      <AllEventsPanel
        events={events}
        appUser={appUser ?? undefined}
        refetchEvents={() => fetchAllEvents()}
      />
    </Container>
  );
}
