import {
  useCurrentDisplay,
  useSessionAction,
} from "@/app/libs/stores/useSessionStore";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import EstimatedTimeTaken from "../profile/EstimatedTimeTaken";
import { ProgressProjectData } from "@/app/types/Types";

interface ProgressProjectBoxProps {
  projectName: string;
  splitProjectName?: string;
  projectData: ProgressProjectData;
}

export default function ProgressProjectBox({
  projectName,
  splitProjectName,
  projectData,
}: ProgressProjectBoxProps) {
  const { setDisplay } = useSessionAction();
  const currentDisplay = useCurrentDisplay();
  const [ShowBackdrop, setShowBackdrop] = useState(false);

  function determineColor(projectData: ProgressProjectData) {
    if (projectData.status === undefined) {
      return "white";
    }
    if (projectData.status === "in_progress") {
      return "yellow.100";
    }
    if (projectData.status === "finished") {
      return "gray";
    }
  }

  function onClickHandler() {
    setShowBackdrop(true);
  }

  function onClose() {
    setShowBackdrop(false);
  }

  function onTimetable(user: "mentor" | "student") {
    setShowBackdrop(false);
    setDisplay({ user: user, isOpen: true });
  }
  return (
    <Box display="flex">
      <Box
        onClick={onClickHandler}
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width={projectData.isSplitProject ? "7vw" : "14.2vw"}
        height="8vh"
        paddingLeft="0.8vw"
        paddingRight="0.8vw"
        border="3px solid black"
        marginRight={projectData.isSplitProject ? "2px" : "0px"}
        bg={determineColor(projectData)}
      >
        {projectData.projectName}

        <Modal isOpen={ShowBackdrop} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>{projectData.projectName}</ModalHeader>
            <ModalBody>
              <EstimatedTimeTaken
                project_id={projectData.projectID}
                start_at={projectData.projectStart}
                status={projectData.status}
              />
            </ModalBody>

            <ModalFooter>
              {projectData.status === "finished" ? (
                <Button
                  colorScheme="blue"
                  mr={3}
                  variant="ghost"
                  onClick={() => onTimetable("mentor")}
                >
                  {" "}
                  Become a Mentor
                </Button>
              ) : null}

              <Button
                colorScheme="green"
                mr={3}
                variant="ghost"
                onClick={() => onTimetable("student")}
              >
                Subscribe for a mentor
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      {splitProjectName ? (
        <Box
          onClick={onClickHandler}
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          width="7vw"
          height="8vh"
          paddingLeft="0.8vw"
          paddingRight="0.8vw"
          border="3px solid black"
          marginLeft="2px"
          bg="white"
        >
          {splitProjectName}
        </Box>
      ) : null}
    </Box>
  );
}
