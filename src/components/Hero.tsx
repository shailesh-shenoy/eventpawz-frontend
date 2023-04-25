import NextLink from "next/link";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function Hero() {
  return (
    <Stack
      as={"section"}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      bg="secondary.100"
      color="gray.900"
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading
            fontSize={"6xl"}
            textAlign={{ base: "center", md: "inherit" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              fontWeight={700}
              zIndex={1}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%" }),
                position: "absolute",
                bottom: 6,
                left: 0,
                bg: "primary.400",
                zIndex: -1,
              }}
            >
              EventPawz
            </Text>
            <br />
            <Text color={"primary.400"} fontWeight={400} as={"span"}>
              Create Events, or Join Events
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.600"}>
            EventPawz is a simple way to create events, or join events. You can
            create events for your friends, or join events that your friends
            have created. You can also join events that are open to the public.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              as={NextLink}
              href="/create-event"
              rounded={"full"}
              bg={"gray.800"}
              color={"white"}
              _hover={{
                bg: "green.600",
              }}
            >
              Get Started
            </Button>
            <Button
              as={NextLink}
              href="/all-events"
              rounded={"full"}
              variant="outline"
              colorScheme="gray.900"
              _hover={{ color: "green.600" }}
            >
              Browse
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Hero Image"} objectFit={"cover"} src={"/hero-image.jpg"} />
      </Flex>
    </Stack>
  );
}
