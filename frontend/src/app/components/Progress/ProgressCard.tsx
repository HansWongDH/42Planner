"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import ProgressProject from "./ProgressProject";

interface ProgressCardProps {
  level: number;
}

function levelHandler(level: number) {
  if (level == 1) {
    return (
      <VStack spacing={4} alignItems="center">
        <ProgressProject projectName="Libft"></ProgressProject>
      </VStack>
    );
  }
  if (level == 2) {
    return (
      <VStack spacing={4} alignItems="center">
        <ProgressProject projectName="get_next_line"></ProgressProject>
        <ProgressProject projectName="ft_printf"></ProgressProject>
        <ProgressProject projectName="Born2beroot"></ProgressProject>
      </VStack>
    );
  }
  if (level == 3) {
    return (
      <VStack spacing={4} alignItems="center">
        <ProgressProject
          projectName="FdF"
          splitProjectName="so_long"
        ></ProgressProject>
        <ProgressProject
          projectName="minitalk"
          splitProjectName="pipex"
        ></ProgressProject>
        <ProgressProject projectName="push_swap"></ProgressProject>
      </VStack>
    );
  }
  if (level == 4) {
    return (
      <VStack spacing={4} alignItems="center">
        <ProgressProject projectName="minishell"></ProgressProject>
        <ProgressProject projectName="Philosophers"></ProgressProject>
      </VStack>
    );
  }
  if (level == 5) {
    return (
      <VStack spacing={4} alignItems="center">
        <ProgressProject
          projectName="CPP (00 - 04)"
          projectSlug="CPP Module 04"
        ></ProgressProject>
        <ProgressProject projectName="NetPractice"></ProgressProject>
        <ProgressProject
          projectName="cub3d"
          splitProjectName="miniRT"
        ></ProgressProject>
      </VStack>
    );
  }
  if (level == 6) {
    return (
      <VStack spacing={4} alignItems="center">
        <ProgressProject
          projectName="webserv"
          splitProjectName="ft_irc"
        ></ProgressProject>
        <ProgressProject
          projectName="CPP (05 - 09)"
          projectSlug="CPP Module 09"
        ></ProgressProject>
        <ProgressProject projectName="Inception"></ProgressProject>
      </VStack>
    );
  }
  if (level == 7) {
    return (
      <VStack spacing={4} alignItems="center">
        <ProgressProject projectName="ft_transcendence"></ProgressProject>
      </VStack>
    );
  }
  if (level) {
    return <div>NULL</div>;
  }
}

export default function ProgressCard({ level }: ProgressCardProps) {
  return (
    <Box
      margin={2}
      border="3px solid black"
      borderRadius="1px"
      bgColor="#A4B5C6"
      height="370px"
    >
      <Box
        display="flex" // making the level one go to the middle
        justifyContent="space-evenly"
        alignItems="center"
        padding="auto"
        borderBottom="3px solid black"
      >
        <Text>Level {level}</Text>
      </Box>
      <Box
        padding="2rem"
        bgColor="#A4B5C6"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {levelHandler(level)}
      </Box>
    </Box>
  );
}
