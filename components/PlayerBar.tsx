import { Flex, Box, Text } from "@chakra-ui/react";
import { useStoreState } from "../lib/store";
import Player from "./Player";

export default function PlayerBar() {
  const activeSong = useStoreState((state) => state.activeSong);

  return (
    <Flex alignItems={"center"} w="full" h="full" bg="black">
      <Box w="30%">
        <Text>{activeSong?.name}</Text>
        <Text>{activeSong?.artist.name}</Text>
      </Box>
      <Box w="40%">
        <Player></Player>
      </Box>
      <Box w="30%">share</Box>
    </Flex>
  );
}
