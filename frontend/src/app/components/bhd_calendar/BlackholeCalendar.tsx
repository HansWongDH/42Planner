import { useCurrentUser } from "@/app/libs/stores/useSessionStore";
import { useEffect, useState } from "react";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DeathCalendar() {
  const currentUser = useCurrentUser();
  const [death_date, setDeathDate] = useState<string | null>(null);
  const [date, setDate] = useState<Value>([new Date(), new Date()]);

  useEffect(() => {
    if (currentUser) {
      const temp = currentUser?.cursus_users[1].blackholed_at;
      setDeathDate(temp);
    }
    if (death_date) {
      setDate([new Date(), new Date(death_date)]);
    }
  }, [currentUser, death_date]);

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
