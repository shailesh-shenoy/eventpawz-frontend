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

export default function CreatedEventsPanel({
  appUser,
  refetchUser,
}: CreatedEventsPanelProps) {
  return (
    <Accordion allowMultiple={true}>
      {appUser?.createdEvents?.map((event: Event) => {
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
                editable={true}
                refetchUser={refetchUser}
              />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

type CreatedEventsPanelProps = {
  appUser?: AppUser;
  refetchUser: (userId: string) => Promise<void>;
};
