import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
  MdFavorite,
  MdHome,
  MdLibraryAdd,
  MdLibraryMusic,
  MdSearch,
} from "react-icons/md";
import { usePlaylists } from "../lib/hooks";
const navs = [
  {
    icon: MdHome,
    title: "Home",
    route: "/",
  },
  {
    icon: MdSearch,
    title: "Search",
    route: "/search",
  },
  {
    icon: MdLibraryMusic,
    title: "Your Library",
    route: "/library",
  },
];

const actions = [
  {
    icon: MdLibraryAdd,
    title: "Create Playlist",
    route: "/",
  },
  {
    icon: MdFavorite,
    title: "My Favorites",
    route: "/",
  },
];

// const playlist = new Array(50)
//   .fill(1)
//   .map((_, i) => ({ title: i + 1, route: "/" }));

function Sidebar() {
  const { playlists, isLoading } = usePlaylists();

  return (
    <Box px="2rem" bgColor={"black"} h="full">
      <Box mb="2" py="2">
        <Image
          src="https://dummyimage.com/120x60"
          width="120px"
          height="60px"
          alt="logo"
        ></Image>
      </Box>

      <VStack
        spacing={4}
        divider={<Divider borderColor="gray.600"></Divider>}
        alignItems={"stretch"}
        h="full"
      >
        <Box>
          <List spacing={2}>
            {navs.map((item) => (
              <ListItem key={item.route}>
                <LinkBox>
                  <Link href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon}></ListIcon>
                      {item.title}
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <List spacing={2}>
            {actions.map((item) => (
              <ListItem key={item.title}>
                <LinkBox>
                  <Link href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon}></ListIcon>
                      {item.title}
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box h={"40%"} overflowY={"auto"}>
          <List spacing={1}>
            {!isLoading &&
              playlists.map((item) => (
                <ListItem key={item.name}>
                  <LinkBox>
                    <Link
                      href={{
                        pathname: "/playlist/[id]",
                        query: { id: item.id },
                      }}
                      passHref
                    >
                      <LinkOverlay>{item.name}</LinkOverlay>
                    </Link>
                  </LinkBox>
                </ListItem>
              ))}
          </List>
        </Box>
      </VStack>
    </Box>
  );
}

export default Sidebar;
