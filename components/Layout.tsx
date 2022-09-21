import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";

export interface Prop {
  children: React.ReactNode;
}

function Layout({ children }: Prop) {
  return (
    <Box width={"100vw"} h={"100vh"}>
      <Box
        pos={"absolute"}
        width="250px"
        h={"calc(100vh - 100px)"}
        overflow="hidden"
      >
        <Sidebar></Sidebar>
      </Box>
      <Box ml={"250px"} h={"calc(100vh - 100px)"}>
        {children}
      </Box>
      <Box pos="absolute" h={"100px"} bottom="0" w="full">
        <PlayerBar />
      </Box>
    </Box>
  );
}

export default Layout;
