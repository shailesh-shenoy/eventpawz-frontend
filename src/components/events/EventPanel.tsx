import { Event } from "@/types/types";
import { getAuthorizationHeader } from "@/utilities/getAuthorizationHeader";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosHeaders } from "axios";
import { useState } from "react";

export default function EventPanel({
  editable,
  attendable,
  event,
  appUserId,
  refetchUser,
}: EventPanelProps) {
  const [editMode, setEditMode] = useState(false);
  const [eventName, setEventName] = useState(event?.eventName);
  const [eventDescription, setEventDescription] = useState(event?.description);
  const [eventDate, setEventDate] = useState(event?.eventDate);
  const [eventStartTime, setEventStartTime] = useState(event?.eventStartTime);
  const [eventEndTime, setEventEndTime] = useState(event?.eventEndTime);
  const [eventAddress, setEventAddress] = useState(event?.address);
  const [eventCity, setEventCity] = useState(event?.city);
  const [eventState, setEventState] = useState(event?.state);
  const [eventZipCode, setEventZipCode] = useState(event?.zipCode);
  const [eventType, setEventType] = useState(event?.eventType?.type);
  const [eventVirtualLink, setEventVirtualLink] = useState(
    event?.virtualMeetLink
  );

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "";
  const defaultCoverImage = "/default-event.jpg";
  const toast = useToast();

  return (
    <SimpleGrid
      as="form"
      onSubmit={handleSubmit}
      columns={{ base: 1, md: 2 }}
      spacing={4}
      p={4}
    >
      {editable && (
        <Button
          gridColumn={{ base: "span 1", md: "span 2" }}
          colorScheme="blue"
          maxW={20}
          onClick={() => setEditMode(!editMode)}
        >
          Edit
        </Button>
      )}

      <Image
        src={
          event?.coverImage
            ? `${API_HOST}/${event.coverImage}`
            : defaultCoverImage
        }
        alt="Event Cover Image"
        gridColumn={{ base: "span 1", md: "span 2" }}
      />

      <FormControl isReadOnly>
        <FormLabel>Event Id</FormLabel>
        <Input type="text" value={event?.eventId ?? ""} />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event Name</FormLabel>
        <Input
          type="text"
          value={eventName ?? ""}
          onChange={(e) => setEventName(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event Description</FormLabel>
        <Input
          type="text"
          value={eventDescription ?? ""}
          onChange={(e) => setEventDescription(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel>Status</FormLabel>
        <Input type="text" value={event?.status ?? ""} />
      </FormControl>

      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event Date</FormLabel>
        <Input
          type="date"
          value={eventDate ?? ""}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event Start Time</FormLabel>
        <Input
          type="time"
          step="1"
          value={eventStartTime ?? ""}
          onChange={(e) => setEventStartTime(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event End Time</FormLabel>
        <Input
          type="time"
          step="1"
          value={eventEndTime ?? ""}
          onChange={(e) => setEventEndTime(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event Address</FormLabel>
        <Input
          type="text"
          value={eventAddress ?? ""}
          onChange={(e) => setEventAddress(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event City</FormLabel>
        <Input
          type="text"
          value={eventCity ?? ""}
          onChange={(e) => setEventCity(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event State</FormLabel>
        <Input
          type="text"
          value={eventState ?? ""}
          onChange={(e) => setEventState(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event Zip Code</FormLabel>
        <Input
          type="text"
          value={eventZipCode ?? ""}
          onChange={(e) => setEventZipCode(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event Type</FormLabel>
        <Input
          type="text"
          value={eventType ?? ""}
          onChange={(e) => setEventType(e.target.value)}
        />
      </FormControl>
      <FormControl isReadOnly={!editMode}>
        <FormLabel>Event Virtual Link</FormLabel>
        <Input
          type="text"
          value={eventVirtualLink ?? ""}
          onChange={(e) => setEventVirtualLink(e.target.value)}
        />
      </FormControl>
      {editMode && (
        <Button
          gridColumn={{ base: "span 1", md: "span 2" }}
          type="submit"
          colorScheme="green"
          maxW={20}
        >
          Submit
        </Button>
      )}
      {attendable && (
        <Button
          onClick={handleAttend}
          gridColumn={{ base: "span 1", md: "span 2" }}
          maxW={20}
          colorScheme="primary"
        >
          Attend
        </Button>
      )}
    </SimpleGrid>
  );

  async function handleAttend(e: any) {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    } as unknown as AxiosHeaders;

    axios
      .post(
        `${API_BASE_URL}/events/${event?.eventId}/register`,
        {
          userId: appUserId,
        },
        { headers }
      )
      .then((data) => {
        console.log("EventRegistration: ", data);
        refetchUser(appUserId ?? "");
        toast({
          title: "Success",
          description: "You have successfully registered for this event!",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log("EventRegistration: ", error);
        toast({
          title: "Error",
          description: "There was an error registering for this event.",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    } as unknown as AxiosHeaders;
    axios
      .patch(
        `${API_BASE_URL}/users/${appUserId}/events/${event?.eventId}`,
        {
          eventName,
          description: eventDescription,
          eventDate,
          eventStartTime,
          eventEndTime,
          address: eventAddress,
          city: eventCity,
          state: eventState,
          zipCode: eventZipCode,
          eventType: {
            type: eventType,
          },
          virtualMeetLink: eventVirtualLink,
        },
        { headers }
      )
      .then((data) => {
        console.log(data);
        toast({
          title: "Success",
          description: "Your event has been updated!",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        refetchUser(appUserId ?? "");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: `There was an error creating your event: ${err?.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }
}

type EventPanelProps = {
  editable: boolean;
  attendable: boolean;
  event?: Event;
  appUserId?: string;
  refetchUser: (userId: string) => Promise<void>;
};
