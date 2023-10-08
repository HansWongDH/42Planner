import callAPI from "@/app/libs/CallApi";
import {
  useAccessToken,
  useCurrentAverageHour,
  useCurrentDisplay,
} from "@/app/libs/stores/useSessionStore";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProjectCalendar from "../project_calendar.tsx/ProjectCalendar";

interface EstimatedTimeTakenProps {
  project_id: number | undefined;
  start_at: string | undefined;
  status: "in_progress" | "finished" | "searching_a_group" | undefined;
}

interface calenderProps {
  end_date: Date;
}
function DaysToComplete(
  start_at: Date,
  averageHour: number,
  hourNeeded: number
) {
  const dayTaken = (Date.now() - start_at.getTime()) / 86400000;
  if (dayTaken < 0) return 0;
  const hourTaken = dayTaken * (averageHour / 7);
  const dayRemains = Math.round((hourNeeded - hourTaken) / (averageHour / 7));
  console.log(dayTaken, "----", hourTaken);
  if (dayRemains < 0) return 10;
  return dayRemains;
}

export function cal({ end_date }: calenderProps) {
  return end_date;
}
export default function EstimatedTimeTaken({
  project_id,
  start_at,
  status,
}: EstimatedTimeTakenProps) {
  const accessToken = useAccessToken();
  const [estimatedTime, setEstimatedTime] = useState(0);
  const CurrentDisplay = useCurrentDisplay();
  const currentAverageHour = useCurrentAverageHour();
  useEffect(() => {
    async function fetchData() {
      if (!accessToken || !project_id) return;
      const info = await callAPI("GET", `projects/${project_id}`, accessToken);
      const estTime = info.body.project_sessions[0].estimate_time.match(/\d+/);
      if (estTime) setEstimatedTime(parseInt(estTime[0], 10));
    }
    fetchData();
  }, [CurrentDisplay]);
  const dayRemains =
    status == "in_progress"
      ? DaysToComplete(
          new Date(start_at ?? 0),
          currentAverageHour,
          estimatedTime
        )
      : 0;
  return (
    <Box>
      <text>Estimated Time to complete : {dayRemains} day</text>
      <ProjectCalendar days={dayRemains}></ProjectCalendar>;
    </Box>
  );
}
