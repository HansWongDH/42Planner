"use client";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ProgressCard from "./Progress/ProgressCard";
import ProgressPercentageBar from "./Progress/ProgressPercentageBar";

export default function MainDisplay() {
  const [displayGame, setDisplayGame] = useState(false);

  return (
    <Box padding="auto">
      <Flex margin={4}>
        <ProgressCard level={1}></ProgressCard>
        <ProgressCard level={2}></ProgressCard>
        <ProgressCard level={3}></ProgressCard>
        <ProgressCard level={4}></ProgressCard>
        <ProgressCard level={5}></ProgressCard>
        <ProgressCard level={6}></ProgressCard>
        <ProgressCard level={7}></ProgressCard>
      </Flex>
      <ProgressPercentageBar percentage={30}></ProgressPercentageBar>
    </Box>
  );
}
