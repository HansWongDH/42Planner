import { useEffect, useState } from "react";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Deadline {
  days: number;
}

export default function ProjectCalendar() {
  const deadline_date = new Date(
    2023,
    11,
    20
  ); /* To be swapped out for the real date */
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
