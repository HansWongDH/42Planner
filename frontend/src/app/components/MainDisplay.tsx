"use client";
import { Box } from "@chakra-ui/react";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

export default function MainDisplay() {
  const [displayGame, setDisplayGame] = useState(false);

  useEffect(() => {});

  return (
    <>
      <Box bg="tomato" w="100%" p={4} color="white">
        This is the Box
      </Box>
    </>
  );
}
