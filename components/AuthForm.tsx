import { Box, Input, Center, Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { auth } from "../lib/mutations";
import Image from "next/image";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await auth(mode, { email, password });
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Box h="100vh" bg="black" color={"white"}>
      <Center h="100px" borderBottom={"1px solid white"}>
        <Image
          src="https://dummyimage.com/120x60"
          width="120px"
          height="60px"
          alt="logo"
        ></Image>
      </Center>
      <Center h="calc(100vh - 100px)">
        <Center w="500px" h="300px" onSubmit={handleSubmit} as="form" px="8">
          <Stack spacing={4} w="full" align={"start"}>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button type="submit" isLoading={loading} colorScheme="twitter">
              {mode}
            </Button>
          </Stack>
        </Center>
      </Center>
    </Box>
  );
}
