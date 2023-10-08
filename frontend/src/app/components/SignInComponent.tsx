"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import callAPI from "../libs/CallApi";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import {
  useCurrentSession,
  useSessionAction,
} from "../libs/stores/useSessionStore";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

interface signInProps {
  session: Session | null | undefined;
}
export default function SignInComponent() {
  const session = useCurrentSession();
  return (
    <Box>
      {session ? (
        <Box>
          <Heading>Welcome {session.user?.name}</Heading>
          <Button
            onClick={() => signOut()}
            colorScheme="red" // Set the button color to red
            variant="outline" // Use an outline style for the button
            mt={4} // Add margin-top for spacing
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <Box>
          <Heading>You are not logged in.</Heading>
          <Button
            onClick={() => signIn("42-school")}
            colorScheme="blue" // Set the button color to blue
            variant="outline" // Use a solid style for the button
            mt={4} // Add margin-top for spacing
          >
            Sign In
          </Button>
        </Box>
      )}
    </Box>
  );
}
