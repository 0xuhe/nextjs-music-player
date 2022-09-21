import { Box, Center } from "@chakra-ui/react";
import AuthForm from "../components/AuthForm";

function signupPage() {
  return <AuthForm mode="signup"></AuthForm>;
}

signupPage.authPage = true;

export default signupPage;
