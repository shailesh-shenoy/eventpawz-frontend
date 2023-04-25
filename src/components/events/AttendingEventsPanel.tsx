import { AppUser, Event } from "@/types/types";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormControl,
  Heading,
  Stack,
} from "@chakra-ui/react";
import EventPanel from "./EventPanel";

export default function AttendingEventsPanel({
  appUser,
  refetchUser,
}: AttendingEventsPanelProps) {
  return (
    <Accordion allowMultiple={true}>
      {appUser?.attendedEvents?.map((event: Event) => {
        return (
          <AccordionItem key={event.eventId}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Heading as="h3" fontSize="large" fontWeight={400}>
                  {event.eventName}
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <EventPanel
                attendable={false}
                event={event}
                appUserId={appUser?.id?.toString()}
                editable={false}
                refetchUser={refetchUser}
              />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

type AttendingEventsPanelProps = {
  appUser?: AppUser;
  refetchUser: (userId: string) => Promise<void>;
};
