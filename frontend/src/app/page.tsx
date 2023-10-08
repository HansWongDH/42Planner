"use client";
import { getSession } from "next-auth/react";
import SignInComponent from "./components/SignInComponent";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import ExampleApiCall from "./components/exampleApiCall";
import MainDisplay from "./components/MainDisplay";
import CadetProfile from "./components/profile/CadetProfile";
import AverageHourPerWweek from "./components/profile/AverageHourPerWeek";
import Timetable from "./components/timetable/timetable";
import { Collapse } from "@chakra-ui/react";
import DeathCalendar from "./components/bhd_calendar/BlackholeCalendar";
import ProjectCalendar from "./components/project_calendar.tsx/ProjectCalendar";

function Homepage() {
  const [session, setSession] = useState<Session | null | undefined>();
  useEffect(() => {
    async function fetchSession() {
      const newSession = await getSession();
      setSession(newSession);
    }
    fetchSession();
  }, []);
  return (
    <div>
      <SignInComponent session={session} />
      <CadetProfile></CadetProfile>
      <AverageHourPerWweek></AverageHourPerWweek>
      <MainDisplay></MainDisplay>
      <Timetable></Timetable>
      <DeathCalendar></DeathCalendar>
      <ProjectCalendar></ProjectCalendar>
    </div>
  );
}

export default Homepage;
