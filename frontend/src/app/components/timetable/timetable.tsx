import React, { useState, useEffect } from "react";
import { Box, Table, Tbody, Tr, Td } from "@chakra-ui/react";

function Timetable() {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hoursOfDay = Array.from({ length: 24 }, (_, index) => index);

  const [selectedCell, setSelectedCell] = useState<
    {
      cell: {
        day: string;
        hour: number;
      };
      flag: boolean;
    }[]
  >([
    { cell: { day: daysOfWeek[3], hour: 10 }, flag: false },
    { cell: { day: daysOfWeek[2], hour: 12 }, flag: false },
    { cell: { day: daysOfWeek[2], hour: 18 }, flag: false },
    { cell: { day: daysOfWeek[5], hour: 8 }, flag: false },
  ]);
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      currentDate.getDate() - ((currentDate.getDay() + 6) % 7)
    );

    const weekDates = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + index);
      return date;
    });

    setCurrentWeek(weekDates);
  }, []);

  const handleCellClick = (day: string, hour: number) => {
    const updatedSelectedCell = selectedCell.map((map) => {
      if (map.cell.day === day && map.cell.hour === hour) {
        map.flag = !map.flag;
      }
      return map;
    });
    setSelectedCell(updatedSelectedCell);
  };

  function findCellFlag(day: string, hour: number) {
    const findCell = selectedCell.filter(
      (map) => map.cell.day === day && map.cell.hour === hour
    );

    if (findCell.length > 0) {
      return findCell[0].flag;
    } else {
      return null;
    }
  }
  console.log(findCellFlag(daysOfWeek[3], 10));
  return (
    <Box>
      <Table borderWidth="1px" borderColor="black" variant="unstyled">
        <Tbody>
          <Tr>
            <Td></Td>
            {currentWeek.map((date, index) => (
              <Td
                key={index}
                borderWidth="1px"
                borderColor="black"
                p="2"
                bg="white"
                textAlign="center"
              >
                {daysOfWeek[index]} {date.toLocaleDateString()}
              </Td>
            ))}
          </Tr>
          {hoursOfDay.map((hour) => (
            <Tr key={hour}>
              <Td
                borderWidth="1px"
                borderColor="black"
                p="2"
                bg="white"
                textAlign="right"
              >
                {`${hour}:00`}
              </Td>
              {currentWeek.map((date, index) => (
                <Td
                  key={`${daysOfWeek[index]}-${hour}`}
                  borderWidth="1px"
                  borderColor="black"
                  bg={
                    findCellFlag(daysOfWeek[index], hour) == null
                      ? "white"
                      : findCellFlag(daysOfWeek[index], hour)
                      ? "red.100"
                      : "cyan.100"
                  }
                  _hover={{ cursor: "pointer", background: "teal.200" }}
                  onClick={() => handleCellClick(daysOfWeek[index], hour)}
                ></Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Timetable;
