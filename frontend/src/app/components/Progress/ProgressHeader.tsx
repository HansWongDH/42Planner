import { Box, Text } from "@chakra-ui/react";

interface ProgressHeaderProps {
  headerName: string;
}

export default function ProgressHeader() {
  // { headerName }: ProgressHeaderProps
  return (
    <Box
      width="18vw"
      height="6.5vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" alignItems="center">
        <Text>
          {/* {headerName} */}
          HEADER GOES HERE
        </Text>
      </Box>
    </Box>
  );
}
