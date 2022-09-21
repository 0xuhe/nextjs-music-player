import {
  Box,
  Flex,
  Image,
  Text,
  Center,
  Stack,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { InferGetServerSidePropsType, NextPage } from "next";
import GradientLayout from "../components/GradientLayout";

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { Artist } from "@prisma/client";
import { useMe } from "../lib/hooks";

export const getServerSideProps: GetServerSideProps<{
  artists: Artist[];
}> = async () => {
  const artists = await prisma.artist.findMany(); // your fetch function here

  return {
    props: {
      artists,
    },
  };
};

const Home = ({
  artists,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: me } = useMe();
  return (
    <Box>
      <GradientLayout
        color="red"
        image="/image.png"
        isRounded
        title=""
        subtitle="profile"
        description="150 followers, 300 likes"
      >
        <HStack p="40px" mx="-10px">
          {artists.map((artist) => (
            <Box key={artist.name} w="20%" px="10px">
              <Box borderRadius={"base"} bgColor={"gray.900"} p="15px">
                <Center mb="2">
                  <Image
                    src="https://dummyimage.com/100x100"
                    alt="avatar"
                    borderRadius={"full"}
                  ></Image>
                </Center>
                <Box color="white">
                  <Text fontSize={"sm"} fontWeight="semibold">
                    {artist.name}
                  </Text>
                  <Text fontSize={"xs"}>Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </HStack>
      </GradientLayout>
    </Box>
  );
};

export default Home;
