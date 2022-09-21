import { Box, ColorHues, Colors, Flex, Image, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: string;
  subtitle: string;
  color: string;
  image: string;
  description: string;
  isRounded?: boolean;
};

export default function GradientLayout({
  children,
  title,
  subtitle,
  color,
  image,
  description,
  isRounded = false,
}: Props) {
  return (
    <Box
      h="100%"
      overflowY="auto"
      bgGradient={`linear(to-b, ${color}.500 0, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.9) 75%,  black 85%)`}
    >
      <Flex p="40px" align={"end"}>
        <Box>
          <Image
            rounded={isRounded ? "full" : "none"}
            src={image}
            boxSize="160px"
            boxShadow="2xl"
            alt="teaser"
          ></Image>
        </Box>
        <Box color="white" ml="20px">
          <Text fontSize={"small"} fontWeight="semibold">
            {subtitle}
          </Text>
          <Text fontSize={"5xl"} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize={"x-small"} fontWeight="light">
            {description}
          </Text>
        </Box>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
}
