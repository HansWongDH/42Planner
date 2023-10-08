import callAPI from "@/app/libs/CallApi";
import {
  useAccessToken,
  useCurrentAverageHour,
  useCurrentSession,
  useCurrentUser,
  useSessionAction,
} from "@/app/libs/stores/useSessionStore";
import { useEffect, useState } from "react";

interface locationStats {
  begin_at: string;
  end_at: string;
}
interface timeInfo {
  Date: string;
  Hours: number;
}

function convertDatesToGMT8(dateArray: locationStats[]) {
  const dateMap = new Map<string, number>(); // Map to store date and total hours

  dateArray.forEach((data) => {
    const BeginAt = new Date(data.begin_at);

    const EndAt = new Date(data.end_at);

    const dateKey = BeginAt.toLocaleString("en-US", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    let hourDifference;
    if (dateKey) {
      hourDifference = Math.round(
        Math.abs(EndAt.getTime() - BeginAt.getTime()) / 3600000
      );
      if (dateMap.has(dateKey)) {
        dateMap.set(dateKey, (dateMap.get(dateKey) ?? 0) + hourDifference);
      } else {
        dateMap.set(dateKey, hourDifference);
      }
    }
  });
  const resultArray = Array.from(dateMap).map(([Date, Hours]) => ({
    Date,
    Hours,
  }));

  return resultArray;
}

function getWeekNumber(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
function dateToWeek(array: timeInfo[]) {
  const weeks = new Map<string, number>();

  array.forEach((item) => {
    const date = new Date(item.Date);
    const year = date.getFullYear();
    const weekNumber = getWeekNumber(date);

    const weekKey = `${year}-W${weekNumber}`;

    if (!weeks.has(weekKey)) {
      weeks.set(weekKey, 0);
    }

    weeks.set(weekKey, (weeks.get(weekKey) ?? 0) + item.Hours);
  });

  const weeksarray = Array.from(weeks.values());
  return weeksarray;
}

function calculateAverageHourPerWeek(data: number[]) {
  let totalHour: number = 0;
  let i = 1;
  for (; i <= 4; i++) {
    if (!data[i]) {
      break;
    }
    totalHour += data[i];
  }

  return totalHour / (i - 1);
}
export default function AverageHourPerWweek() {
  const accessToken = useAccessToken();
  const currentUser = useCurrentUser();
  const sessionAction = useSessionAction();

  const [timeData, setTimeData] = useState<locationStats[]>([]);

  useEffect(() => {
    async function fetchDays(userID: number, accessToken: string) {
      const data = await callAPI(
        "GET",
        `users/${userID}/locations`,
        accessToken
      );
      setTimeData(data.body);
    }
    if (currentUser) fetchDays(currentUser.id, accessToken ?? "");
  }, [currentUser]);
  useEffect(() => {
    if (timeData.length != 0) {
      const timeInfo: timeInfo[] = convertDatesToGMT8(timeData);
      const averageHour = calculateAverageHourPerWeek(dateToWeek(timeInfo));
      sessionAction.setAverageHour(averageHour);
    }
  }, [timeData]);

  const averageHour = useCurrentAverageHour();
  return <div>AverageHour: {averageHour}</div>;
}
