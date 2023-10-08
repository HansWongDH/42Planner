import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Collapse,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  useCurrentDisplay,
  useCurrentMentorSlot,
  useCurrentStudentSlot,
  useSessionAction,
} from "@/app/libs/stores/useSessionStore";
import { timeSlot } from "@/app/types/timeSlotType";

export default function Timetable() {
  const mentorSlot = useCurrentMentorSlot();
  const studentSlot = useCurrentStudentSlot();
  const [currentMentorSlot, setCurrentMentorSlot] =
    useState<timeSlot[]>(mentorSlot);
  const [currentStudentSlot, setCurrentStudentSlot] =
    useState<timeSlot[]>(studentSlot);
  const currentDisplay = useCurrentDisplay();
  const sessionAction = useSessionAction();
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
    const existingIndex = currentMentorSlot.findIndex(
      (item) => item.day === day && item.hour === hour
    );
    const matchIndex = currentStudentSlot.findIndex(
      (item) => item.day === day && item.hour === hour
    );
    if (currentDisplay.user === "mentor") {
      if (existingIndex !== -1 && matchIndex === -1) {
        currentMentorSlot.splice(existingIndex, 1);
      } else currentMentorSlot.push({ day, hour });
      sessionAction.setMentorTimeSlot(currentMentorSlot);
    } else if (currentDisplay.user === "student" && existingIndex !== -1) {
      if (matchIndex !== -1) {
        currentStudentSlot.splice(matchIndex, 1);
      } else {
        currentStudentSlot.push({ day, hour });
      }
      sessionAction.setStudentTimeSlot(currentStudentSlot);
    }
  };

  function findCellFlag(day: string, hour: number) {
    const mentorMatch = currentMentorSlot.find((map) => {
      return map.day === day && map.hour === hour;
    });
    const studentMatch = currentStudentSlot.find((map) => {
      return map.day === day && map.hour === hour;
    });
    if (studentMatch) return true;
    else if (mentorMatch) return false;
    else return null;
  }
  function onClose() {
    sessionAction.setDisplay({ ...currentDisplay, isOpen: false });
  }
  return (
    <Modal isOpen={currentDisplay.isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
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
                      onClick={() => {
                        handleCellClick(daysOfWeek[index], hour);
                      }}
                    ></Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </ModalContent>
    </Modal>
  );
}
