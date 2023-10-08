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
import { Collapse } from "@chakra-ui/react";
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
    <div>
      <SignInComponent />
      <CadetProfile></CadetProfile>
      <AverageHourPerWweek></AverageHourPerWweek>
      <MainDisplay></MainDisplay>
      <Timetable></Timetable>
      <DeathCalendar></DeathCalendar>
    </div>
  );
}

export default Homepage;
