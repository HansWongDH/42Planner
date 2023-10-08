"use client";

import { useCurrentUser } from "@/app/libs/stores/useSessionStore";
import ProgressProjectBox from "./ProgressProjectBox";
import { ProgressProjectData, ProjectList } from "@/app/types/Types";
import { blackHoleDayCalculator } from "../utils/blackHoledaysCalculator";

interface ProgessProjectProps {
  projectName: string;
  splitProjectName?: string;
  projectSlug?: string;
}
const currentExp = 0;

export default function ProgressProject({
  projectName,
  splitProjectName,
  projectSlug,
}: ProgessProjectProps) {
  const currentUser = useCurrentUser();

  if (!currentUser) return;
  const data = currentUser.projects_users.find((map) => {
    return map.project.name === projectName || map.project.name === projectSlug; // Returns if the map.project.name exist as either one of the three
  });

  const splitData = currentUser.projects_users.find((map) => {
    return map.project.name === splitProjectName; // Returns if the map.project.name exist as either one of the three
  });
  const projectData: ProgressProjectData = {
    projectName: projectName,
    projectID: 0,
    projectStart: "",
    isSplitProject: undefined,
    isProjectSlug: false,
    status1: undefined,
    status2: undefined,
  };

  projectData.projectName = data?.project.name;

  if (projectSlug) {
    projectData.projectName = projectSlug;
    projectData.isProjectSlug = true;
  }

  if (splitProjectName) {
    projectData.isSplitProject = splitProjectName;
  }

  projectData.status1 = data?.status;

  if (projectName === "cub3d") console.log(data?.status);
  projectData.status2 = splitData?.status;
  projectData.projectID = data?.project.id;
  projectData.projectStart = data?.created_at ?? splitData?.created_at ?? "";
  if (!projectData.projectName) {
    projectData.projectName = projectName;
  }
  return (
    <ProgressProjectBox
      projectName={projectName}
      splitProjectName={splitProjectName}
      projectData={projectData}
    ></ProgressProjectBox>
  );
}
