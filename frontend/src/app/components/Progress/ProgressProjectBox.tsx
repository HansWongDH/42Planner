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
  const [ShowBackdrop, setShowBackdrop] = useState(false);

  function determineColor(
    status: "in_progress" | "finished" | "searching_a_group" | undefined
  ) {
    if (status === undefined) {
      return "white";
    }
    if (status === "in_progress" || status === "searching_a_group") {
      return "yellow.100";
    }
    if (status === "finished") {
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
        bg={determineColor(projectData.status1)}
      >
        {projectName}

        <Modal isOpen={ShowBackdrop} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>{projectData.projectName}</ModalHeader>
            <ModalBody>
              <EstimatedTimeTaken
                project_id={projectData.projectID}
                start_at={projectData.projectStart}
                status={projectData.status1}
              />
            </ModalBody>

            <ModalFooter>
              {projectData.status1 === "finished" ? (
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
          bg={determineColor(projectData.status2)}
        >
          {projectData?.isSplitProject}
        </Box>
      ) : null}
    </Box>
  );
}
