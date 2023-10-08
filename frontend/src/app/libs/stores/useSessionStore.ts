import { UserData } from "@/app/types/userData";
import { displayType } from "@/app/types/displayType";
import { Session, User } from "next-auth";

import { create } from "zustand";
import { timeSlot } from "@/app/types/timeSlotType";

interface sessionStore {
  data: {
    session: Session | null | undefined;
    accessToken: string | null;
    user: UserData | null;
    display: displayType;
    averageHour: number;
    mentorTimeSlot: timeSlot[];
    studentTimeSlot: timeSlot[];
  };
  actions: {
    getSession: () => Session | null | undefined;
    getAccessToken: () => string | null;
    getUser: () => UserData | null;
    setSession: (session: Session) => void;
    setAccessToken: (accessToken: string) => void;
    setUser: (user: UserData) => void;
    setDisplay: (display: displayType) => void;
    setAverageHour: (averageHour: number) => void;
    setMentorTimeSlot: (timeslot: timeSlot[]) => void;
    setStudentTimeSlot: (timeslot: timeSlot[]) => void;
  };
}

type StoreSetter = (
  helper: (state: sessionStore) => Partial<sessionStore>
) => void;
type StoreGetter = () => sessionStore;
function getSession(get: StoreGetter) {
  const session = get().data.session;
  return session;
}

function getAccessToken(get: StoreGetter) {
  const accessToken = get().data.accessToken;
  return accessToken;
}

function getUser(get: StoreGetter) {
  const userData = get().data.user;
  return userData;
}

function setSession(set: StoreSetter, session: Session) {
  set(({ data }) => ({
    data: {
      ...data,
      session: session,
    },
  }));
}

function setAccessToken(set: StoreSetter, accessToken: string) {
  set(({ data }) => ({
    data: {
      ...data,
      accessToken: accessToken,
    },
  }));
}

function setUser(set: StoreSetter, user: UserData) {
  set(({ data }) => ({
    data: {
      ...data,
      user: user,
    },
  }));
}

function setDisplay(set: StoreSetter, display: displayType) {
  set(({ data }) => ({
    data: {
      ...data,
      display: display,
    },
  }));
}

function setAverageHour(set: StoreSetter, averageHour: number) {
  set(({ data }) => ({
    data: {
      ...data,
      averageHour: averageHour,
    },
  }));
}

function setMentorTimeSlot(set: StoreSetter, studentTimeSlot: timeSlot[]) {
  set(({ data }) => ({
    data: {
      ...data,
      studentTimeSlot: studentTimeSlot,
    },
  }));
}

function setStudentTimeSlot(set: StoreSetter, studentTimeSlot: timeSlot[]) {
  set(({ data }) => ({
    data: {
      ...data,
      studentTimeSlot: studentTimeSlot,
    },
  }));
}

const useSessionStore = create<sessionStore>()((set, get) => ({
  data: {
    session: undefined,
    accessToken: null,
    user: null,
    display: { user: "student", isOpen: false },
    averageHour: 0,
    mentorTimeSlot: [],
    studentTimeSlot: [],
  },
  actions: {
    getSession: () => getSession(get),
    getAccessToken: () => getAccessToken(get),
    getUser: () => getUser(get),
    setSession: (session) => setSession(set, session),
    setAccessToken: (accessToken) => setAccessToken(set, accessToken),
    setUser: (userData) => setUser(set, userData),
    setDisplay: (display) => setDisplay(set, display),
    setAverageHour: (averageHour) => setAverageHour(set, averageHour),
    setMentorTimeSlot: (timeslot) => setMentorTimeSlot(set, timeslot),
    setStudentTimeSlot: (timeslot) => setStudentTimeSlot(set, timeslot),
  },
}));

export const useCurrentSession = () =>
  useSessionStore((state) => state.data.session);
export const useAccessToken = () =>
  useSessionStore((state) => state.data.accessToken);
export const useCurrentDisplay = () =>
  useSessionStore((state) => state.data.display);
export const useCurrentUser = () => useSessionStore((state) => state.data.user);
export const useCurrentAverageHour = () =>
  useSessionStore((state) => state.data.averageHour);
export const useCurrentMentorSlot = () =>
  useSessionStore((state) => state.data.mentorTimeSlot);
export const useCurrentStudentSlot = () =>
  useSessionStore((state) => state.data.studentTimeSlot);
export const useSessionAction = () => useSessionStore((state) => state.actions);
