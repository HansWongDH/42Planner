export interface ProgressProjectData {
  projectName: string | undefined;
  projectID: number | undefined;
  projectStart: string | undefined;
  isSplitProject: string | undefined;
  isProjectSlug: boolean;
  status: "in_progress" | "finished" | undefined;
}
