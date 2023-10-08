import { useEffect, useState } from "react";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Deadline {
  days: number;
}

export default function ProjectCalendar({ days }: Deadline) {
  const now_date = new Date();
  const deadline_date = new Date(
    now_date.getTime() + days * 24 * 60 * 60 * 1000
  );
  const [range, setRange] = useState<Value>([new Date(), new Date()]);

  useEffect(() => {
    if (deadline_date) {
      setRange([new Date(), new Date(deadline_date)]);
    }
  }, []);

  if (!deadline_date) return;

  return (
    <div>
      <h1>Project Deadline Calendar</h1>
      <Calendar
        tileClassName={"disable-pointer"}
        selectRange={true}
        value={range}
      ></Calendar>
    </div>
  );
}
