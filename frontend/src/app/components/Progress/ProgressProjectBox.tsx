import {
  useCurrentDisplay,
  useSessionAction,
} from "@/app/libs/stores/useSessionStore";
import { Box, Collapse } from "@chakra-ui/react";
import { Button } from "flowbite-react";
import { useState } from "react";
import EstimatedTimeTaken from "../profile/EstimatedTimeTaken";
import { ProgressProjectData } from "@/app/types/Types";

interface ProgressProjectBoxProps {
  projectData: ProgressProjectData;
}

export default function ProgressProjectBox({
  projectData,
}: ProgressProjectBoxProps) {
  const { setDisplay } = useSessionAction();
  const currentDisplay = useCurrentDisplay();
  const [showEst, setShowEst] = useState(false);

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
    console.log("onClick Handler");
    if (projectData.status === "in_progress") {
      setDisplay(!currentDisplay);
      setShowEst(!showEst);
    }
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
        {projectData.status === "in_progress" ? (
          <Collapse in={showEst}>
            <EstimatedTimeTaken
              project_id={projectData.projectID}
              start_at={projectData.projectStart}
            />
          </Collapse>
        ) : null}
      </Box>
      {projectData.isSplitProject ? (
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
          {projectData.isSplitProject}
        </Box>
      ) : null}
    </Box>
  );
}
