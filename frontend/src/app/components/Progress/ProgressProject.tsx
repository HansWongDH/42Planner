"use client";

import callAPI from "@/app/libs/CallApi";
import {
  useAccessToken,
  useCurrentDisplay,
  useCurrentUser,
  useSessionAction,
} from "@/app/libs/stores/useSessionStore";
import { Box, Button, Collapse } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EstimatedTimeTaken from "../profile/EstimatedTimeTaken";

interface ProgessProjectProps {
  projectName: string;
  splitProjectName?: string;
  projectSlug?: string;
}

export default function ProgressProject({
  projectName,
  splitProjectName,
  projectSlug
}: ProgessProjectProps) {
  const [showEst, setShowEst] = useState(false);
  const currentDisplay = useCurrentDisplay();
  const { setDisplay } = useSessionAction();
  const currentUser = useCurrentUser();
  const accessToken = useAccessToken();
  if (!currentUser) return;
  const data = currentUser.projects_users.find((map) => {
  return (map.project.name === projectName || map.project.name === splitProjectName || map.project.name === projectSlug)})
  const inProgress = data ? (data.status === "in_progress" ? true : false) : null;
  const backgroundColor = inProgress === true ? "yellow.100" : inProgress === false ? "gray" : "white";
 
  function onClickHandler() {
    if (inProgress === true)
    {
      setDisplay(!currentDisplay);
      setShowEst(!showEst);
    }
  }

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
        bg={backgroundColor}
      >
        <Button onClick={onClickHandler}>{projectName}</Button>
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
        <Button onClick={onClickHandler}> {splitProjectName}</Button>
      </Box>
      <Collapse in={showEst}><EstimatedTimeTaken project_id={data?.project.id} inProgress={inProgress} /></Collapse>
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
      bg={backgroundColor}
    >
      <Button onClick={onClickHandler}>{projectName}</Button>
      <Collapse in={showEst}><EstimatedTimeTaken project_id={data?.project.id} inProgress={inProgress} /></Collapse>
    </Box>
  
  );
}
