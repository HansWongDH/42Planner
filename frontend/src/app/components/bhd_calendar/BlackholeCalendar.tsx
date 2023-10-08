import callAPI from "@/app/libs/CallApi";
import { useAccessToken } from "@/app/libs/stores/useSessionStore";
import { useCurrentUser } from "@/app/libs/stores/useSessionStore";
import { useEffect, useState } from "react";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DeathCalendar() {
  const accessToken = useAccessToken();
  const currentUser = useCurrentUser();
  const [death_date, setDeathDate] = useState<string | null>(null);
  const [date, setDate] = useState<Value>([new Date(), new Date()]);

  useEffect(() => {
    async function fetchDeathDay(accessToken: string) {
      const data = await callAPI("GET", "me", accessToken);
      setDeathDate(data.body.cursus_users[1].blackholed_at);
      console.log(data.body);
    }
    if (currentUser) {
      fetchDeathDay(accessToken ?? "");
      if (death_date) setDate([new Date(), new Date(death_date)]);
    }
  }, [currentUser, accessToken]);

  useEffect(() => {
    if (death_date) {
      setDate([new Date(), new Date(death_date)]);
      console.log(death_date);
    }
  }, [death_date]);

  if (!death_date) return;

  return (
    <div>
      <h1>Blackhole Calendar</h1>
      <Calendar
        tileClassName={"disable-pointer"}
        selectRange={true}
        value={date}
      ></Calendar>
    </div>
  );
}
