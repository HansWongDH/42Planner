import { Box, Text } from "@chakra-ui/react";

export default function ProgressPercentageBar({ percentage }: any) {
  return (
    <Box margin="auto">
      <Box
        width="100%"
        height="20px"
        backgroundColor="#ccc" // Background color
        borderRadius="full" // Make it round
        position="relative"
      >
        <Box
          height="100%"
          width={`${percentage}%`}
          backgroundColor="blue" // Progress color
          borderRadius="full" // Make it round
        />
      </Box>
      <Text textAlign="center" marginTop="4px">
        {percentage}%
      </Text>
    </Box>
  );
}
