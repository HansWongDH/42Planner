"use client";

import {
  useAccessToken,
  useCurrentDisplay,
  useCurrentUser,
  useSessionAction,
} from "@/app/libs/stores/useSessionStore";
import { useState } from "react";
import ProgressProjectBox from "./ProgressProjectBox";
import { ProgressProjectData } from "@/app/types/Types";

interface ProgessProjectProps {
  projectName: string;
  splitProjectName?: string;
  projectSlug?: string;
}

export default function ProgressProject({
  projectName,
  splitProjectName,
  projectSlug,
}: ProgessProjectProps) {
  const [showEst, setShowEst] = useState(false);
  const currentDisplay = useCurrentDisplay();
  const { setDisplay } = useSessionAction();
  const currentUser = useCurrentUser();
  const accessToken = useAccessToken();

  if (!currentUser) return;
  const data = currentUser.projects_users.find((map) => {
    return (
      map.project.name === projectName ||
      map.project.name === splitProjectName ||
      map.project.name === projectSlug
    ); // Returns if the map.project.name exist as either one of the three
  });

  const projectData: ProgressProjectData = {
    projectName: "",
    projectID: 0,
    projectStart: "",
    isSplitProject: undefined,
    isProjectSlug: false,
    status: undefined,
  };

  projectData.projectName = data?.project.name;
  if (projectSlug) {
    projectData.projectName = projectSlug;
    projectData.isProjectSlug = true;
  }
  if (splitProjectName) {
    projectData.isSplitProject = splitProjectName;
  }
  projectData.status = data?.status;
  projectData.projectID = data?.project.id;
  projectData.projectStart = data?.created_at;

  return <ProgressProjectBox projectData={projectData}></ProgressProjectBox>;
}
