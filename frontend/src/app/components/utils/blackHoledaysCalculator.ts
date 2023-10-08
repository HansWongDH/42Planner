import { ProjectList } from "@/app/types/Types";

function experienceConverter(
  projectCompleted: ProjectList
): number | undefined {
  if (projectCompleted === ProjectList.LIBFT) {
    return 462;
  }
  if (
    projectCompleted === ProjectList.FT_PRINTF ||
    projectCompleted === ProjectList.GET_NEXT_LINE
  ) {
    return 882;
  }
  if (projectCompleted === ProjectList.BORN2BEROOT) {
    return 577;
  }
  if (
    projectCompleted === ProjectList.SO_LONG ||
    projectCompleted === ProjectList.FDF
  ) {
    return 1000;
  }
  if (
    projectCompleted === ProjectList.MINITALK ||
    projectCompleted === ProjectList.PIPEX
  ) {
    return 1142;
  }
  if (projectCompleted === ProjectList.PUSH_SWAP) {
    return 1855;
  }
  if (projectCompleted === ProjectList.MINISHELL) {
    return 2814;
  }
  if (projectCompleted === ProjectList.PHILOSOPHERS) {
    return 3360;
  }
  if (projectCompleted === ProjectList.NETPRACTICE) {
    return 3160;
  }
  if (
    projectCompleted === ProjectList.CUB3D ||
    projectCompleted === ProjectList.MINIRT
  ) {
    return 5775;
  }
  if (projectCompleted === ProjectList.CPPMODULE04) {
    return 9660;
  }
  if (projectCompleted === ProjectList.CPPMODULE09) {
    return 10042;
  }
  if (
    projectCompleted === ProjectList.WEBSERV ||
    projectCompleted === ProjectList.FT_IRC
  ) {
    return 21630;
  }
  if (projectCompleted === ProjectList.INCEPTION) {
    return 10042;
  }
  if (projectCompleted === ProjectList.FT_TRANSCENDENCE) {
    return 24360;
  }
}

export function blackHoleDayCalculator(
  currentExp: number,
  projectCompleted: ProjectList,
  bonusMultiplier?: number
) {
  var projectExp = experienceConverter(projectCompleted);
  if (!projectExp) {
    projectExp = 0;
  }
  var bonusExp = 1;
  if (bonusMultiplier) {
    bonusExp = bonusMultiplier;
  }
  const blackHoleDaysObtained =
    (Math.pow((currentExp + projectExp) / 49980, 0.45) -
      Math.pow(currentExp / 49980, 0.45)) *
    483;
  return blackHoleDaysObtained;
}
