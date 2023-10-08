export interface ProgressProjectData {
  projectName: string | undefined;
  projectID: number | undefined;
  projectStart: string | undefined;
  isSplitProject: string | undefined;
  isProjectSlug: boolean;
  status1: "in_progress" | "finished" | "searching_a_group" | undefined;
  status2: "in_progress" | "finished" | "searching_a_group" | undefined;
}

export enum ProjectList {
  LIBFT = "LIBFT",
  GET_NEXT_LINE = "GET_NEXT_LINE",
  BORN2BEROOT = "BORN2BEROOT",
  FT_PRINTF = "FT_PRINTF",
  SO_LONG = "SO_LONG",
  FDF = "FDF",
  MINITALK = "MINITALK",
  PIPEX = "PIPEX",
  PUSH_SWAP = "PUSH_SWAP",
  PHILOSOPHERS = "PHILOSOPHERS",
  MINISHELL = "MINISHELL",
  CPPMODULE04 = "CPPMODULE04",
  NETPRACTICE = "NETPRACTICE",
  CUB3D = "CUB3D",
  MINIRT = "MINIRT",
  WEBSERV = "WEBSERV",
  FT_IRC = "FT_IRC",
  INCEPTION = "INCEPTION",
  CPPMODULE09 = "CPPMODULE09",
  FT_TRANSCENDENCE = "FT_TRANSCEDENCE",
}
