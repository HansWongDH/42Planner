"use client";

import { Box, Text } from "@chakra-ui/react";

interface ProgressBoxProps {}

export default function ProgressBox({}: ProgressBoxProps) {
  return (
    <Box border="3px solid black" borderRadius="1px" bgColor="#A4B5C6">
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        padding="auto"
        borderBottom="3px solid black"
      >
        <Text>Level 1</Text>
      </Box>
      <Box padding="10rem" bgColor="#A4B5C6">
        Content
      </Box>
    </Box>
  );
}
