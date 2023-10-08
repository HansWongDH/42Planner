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
import { Box, Collapse } from "@chakra-ui/react";
import DeathCalendar from "./components/bhd_calendar/BlackholeCalendar";

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
      <Box display="flex">
        <Box>
          <SignInComponent session={session} />
          <CadetProfile></CadetProfile>
          <AverageHourPerWweek></AverageHourPerWweek>
        </Box>
        <Timetable></Timetable>
        <DeathCalendar></DeathCalendar>
      </Box>
      <MainDisplay></MainDisplay>
      <Timetable></Timetable>
      <DeathCalendar></DeathCalendar>
    </div>
  );
}

export default Homepage;
