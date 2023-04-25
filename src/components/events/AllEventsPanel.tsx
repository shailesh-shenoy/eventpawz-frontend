import { AppUser, Event } from "@/types/types";
import AllEvents from "../../pages/all-events";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Heading,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import EventPanel from "./EventPanel";

export default function AllEventsPanel({
  events,
  appUser,
  refetchEvents,
}: AllEventsPanelProps) {
  return (
    <Accordion allowMultiple={true}>
      {events
        ?.filter((event) => event.createdBy?.id !== appUser?.id)
        .map((event: Event) => {
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
                  event={event}
                  appUserId={appUser?.id?.toString()}
                  editable={false}
                  attendable={
                    event.attendees?.filter(
                      (attendee) => attendee.id === appUser?.id
                    ).length === 0
                  }
                  refetchUser={refetchEvents}
                />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
}

type AllEventsPanelProps = {
  appUser?: AppUser;
  events?: Event[];
  refetchEvents: () => Promise<void>;
};
