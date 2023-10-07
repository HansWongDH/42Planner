import { Box, Button } from "@chakra-ui/react";

interface ProgessProjectProps {
  projectName: string;
  splitProjectName?: string;
}

function onClickHandler() {}

export default function ProgressProject({
  projectName,
  splitProjectName,
}: ProgessProjectProps) {
  return splitProjectName ? (
    <Box display="flex">
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="7vw"
        height="8vh"
        paddingLeft="0.8vw"
        paddingRight="0.8vw"
        border="3px solid black"
        marginRight="2px"
      >
        <Button>{projectName}</Button>
      </Box>
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="7vw"
        height="8vh"
        paddingLeft="0.8vw"
        paddingRight="0.8vw"
        border="3px solid black"
        marginLeft="2px"
      >
        <Button> {splitProjectName}</Button>
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      width="14.2vw"
      height="8vh"
      paddingLeft="0.8vw"
      paddingRight="0.8vw"
      border="3px solid black"
    >
      <Button>{projectName}</Button>
    </Box>
  );
}
