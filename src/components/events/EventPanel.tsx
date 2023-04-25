import { Event } from "@/types/types";
import { getAuthorizationHeader } from "@/utilities/getAuthorizationHeader";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosHeaders } from "axios";
import { url } from "inspector";
import { useState } from "react";

export default function EventPanel({
  editable,
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

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const toast = useToast();

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit}
      direction="column"
      spacing={4}
      p={4}
    >
      {editable && (
        <Button
          colorScheme="blue"
          maxW={20}
          onClick={() => setEditMode(!editMode)}
        >
          Edit
        </Button>
      )}
      <FormControl isDisabled>
        <FormLabel>Event Id</FormLabel>
        <Input type="text" value={event?.eventId ?? ""} />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event Name</FormLabel>
        <Input
          type="text"
          value={eventName ?? ""}
          onChange={(e) => setEventName(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event Description</FormLabel>
        <Input
          type="text"
          value={eventDescription ?? ""}
          onChange={(e) => setEventDescription(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled>
        <FormLabel>Status</FormLabel>
        <Input type="text" value={event?.status ?? ""} />
      </FormControl>

      <FormControl isDisabled={!editMode}>
        <FormLabel>Event Date</FormLabel>
        <Input
          type="date"
          value={eventDate ?? ""}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event Start Time</FormLabel>
        <Input
          type="time"
          step="1"
          value={eventStartTime ?? ""}
          onChange={(e) => setEventStartTime(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event End Time</FormLabel>
        <Input
          type="time"
          step="1"
          value={eventEndTime ?? ""}
          onChange={(e) => setEventEndTime(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event Address</FormLabel>
        <Input
          type="text"
          value={eventAddress ?? ""}
          onChange={(e) => setEventAddress(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event City</FormLabel>
        <Input
          type="text"
          value={eventCity ?? ""}
          onChange={(e) => setEventCity(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event State</FormLabel>
        <Input
          type="text"
          value={eventState ?? ""}
          onChange={(e) => setEventState(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event Zip Code</FormLabel>
        <Input
          type="text"
          value={eventZipCode ?? ""}
          onChange={(e) => setEventZipCode(e.target.value)}
        />
      </FormControl>
      <FormControl isDisabled={!editMode}>
        <FormLabel>Event Type</FormLabel>
        <Input
          type="text"
          value={eventType ?? ""}
          onChange={(e) => setEventType(e.target.value)}
        />
      </FormControl>
      {editMode && (
        <Button type="submit" colorScheme="green" maxW={20}>
          Submit
        </Button>
      )}
    </Stack>
  );

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
        },
        { headers }
      )
      .then((data) => {
        console.log(data);
        toast({
          title: "Success",
          description: "Your event has been created!",
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
  event?: Event;
  appUserId?: string;
  refetchUser: (userId: string) => Promise<void>;
};
