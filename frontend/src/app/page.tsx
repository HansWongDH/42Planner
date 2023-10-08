"use client";
import { getSession, useSession } from "next-auth/react";
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
import { useSessionAction } from "./libs/stores/useSessionStore";

function Homepage() {
  const [session, setSession] = useState<Session | null | undefined>();
  const sessionAction = useSessionAction();
  useEffect(() => {
    async function fetchSession() {
      const newSession = await getSession();
      setSession(newSession);
      if (newSession && newSession.access_token) {
        sessionAction.setAccessToken(newSession.access_token);
        sessionAction.setSession(newSession);
      }
    }
    fetchSession();
  }, []);
  return (
    <Box>
      <Box
        display={"flex"}
        p={4}
        backgroundColor="beige"
        borderRadius="md"
        boxShadow="lg"
        margin="0 auto"
      >
        <Box marginRight={"500px"}>
          <SignInComponent />
          <CadetProfile></CadetProfile>
          <AverageHourPerWweek></AverageHourPerWweek>
        </Box>
        <DeathCalendar></DeathCalendar>
      </Box>
      <MainDisplay></MainDisplay>
      <Timetable></Timetable>
    </Box>
  );
}

export default Homepage;
