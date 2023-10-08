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
  console.log(projectName);
  const currentUser = useCurrentUser();

  if (!currentUser) return;
  const data = currentUser.projects_users.find((map) => {
    return (
      map.project.name === projectName ||
      map.project.name === splitProjectName ||
      map.project.name === projectSlug
    ); // Returns if the map.project.name exist as either one of the three
  });

  function helperft(projectData: ProgressProjectData | null) {
    if (!projectData) {
      return null;
    }
    return projectData?.status;
  }

  const projectData: ProgressProjectData = {
    projectName: projectName,
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

  if (!projectData.projectName) {
    projectData.projectName = projectName;
  }
  // console.log("-----------------DATA: ", data, " -----------------");
  // console.log(
  //   "Blackholes obtained",
  //   blackHoleDayCalculator(currentExp, ProjectList.LIBFT)
  // );

  return (
    <ProgressProjectBox
      projectName={projectName}
      splitProjectName={splitProjectName}
      projectData={projectData}
    ></ProgressProjectBox>
  );
}
