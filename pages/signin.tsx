import { Box, Center } from "@chakra-ui/react";
import AuthForm from "../components/AuthForm";

function signinPage() {
  return <AuthForm mode="signin"></AuthForm>;
}

signinPage.authPage = true;

export default signinPage;
