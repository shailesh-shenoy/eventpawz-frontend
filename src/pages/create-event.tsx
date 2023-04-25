import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { Event } from "@/types/types";
import { getAuthorizationHeader } from "@/utilities/getAuthorizationHeader";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosHeaders } from "axios";
import { useState } from "react";

export default function CreateEvent() {
  const { user: currentUser, appUser, refetchUser } = useCurrentUser();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventZipCode, setEventZipCode] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventVirtualLink, setEventVirtualLink] = useState("");
  const toast = useToast();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  return (
    <Container maxW="6xl" p={6} minH="90vh">
      <Heading as="h1" fontSize="3xl" fontWeight={500}>
        {`Create Event for ${appUser?.username}`}
      </Heading>
      <SimpleGrid
        as="form"
        bg="gray.100"
        rounded="xl"
        onSubmit={handleCreateEvent}
        columns={2}
        spacing={4}
        mt={6}
        p={4}
      >
        <FormControl>
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            value={eventName ?? ""}
            onChange={(e) => setEventName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event Description</FormLabel>
          <Input
            type="text"
            value={eventDescription ?? ""}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event Date</FormLabel>
          <Input
            type="date"
            value={eventDate ?? ""}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event Type</FormLabel>
          <Input
            type="text"
            value={eventType ?? ""}
            onChange={(e) => setEventType(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event Start Time</FormLabel>
          <Input
            type="time"
            step={1}
            value={eventStartTime ?? ""}
            onChange={(e) => setEventStartTime(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event End Time</FormLabel>
          <Input
            type="time"
            step={1}
            value={eventEndTime ?? ""}
            onChange={(e) => setEventEndTime(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event Address</FormLabel>
          <Input
            type="text"
            value={eventAddress ?? ""}
            onChange={(e) => setEventAddress(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event City</FormLabel>
          <Input
            type="text"
            value={eventCity ?? ""}
            onChange={(e) => setEventCity(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event State</FormLabel>
          <Input
            type="text"
            value={eventState ?? ""}
            onChange={(e) => setEventState(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event Zip Code</FormLabel>
          <Input
            type="text"
            value={eventZipCode ?? ""}
            onChange={(e) => setEventZipCode(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Event Virtual Link</FormLabel>
          <Input
            type="text"
            value={eventVirtualLink ?? ""}
            onChange={(e) => setEventVirtualLink(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          maxW={20}
          gridColumn={{ base: "span 1", md: "span 2" }}
        >
          Submit
        </Button>
      </SimpleGrid>
    </Container>
  );

  function handleCreateEvent(e: any) {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    } as unknown as AxiosHeaders;

    const newEvent = {
      eventName: eventName,
      description: eventDescription,
      eventDate: eventDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      address: eventAddress,
      city: eventCity,
      state: eventState,
      zipCode: eventZipCode,
      eventType: {
        type: eventType,
      },
      virtualMeetLink: eventVirtualLink,
    } as Event;

    axios
      .post(`${API_BASE_URL}/users/${appUser?.id}/events`, newEvent, {
        headers,
      })
      .then((data) => {
        toast({
          title: "Event Created",
          description: `Your event has been created with event id ${
            data?.data?.eventId ?? "!"
          }`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        refetchUser(appUser?.id?.toString() ?? "");
      })
      .catch((error) => {
        toast({
          title: "Event Creation Failed",
          description: `There was an error creating your event: ${error?.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }
}
