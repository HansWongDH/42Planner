import { Session, User } from "next-auth";
import { UserData } from "next-auth/providers/42-school";
import { create } from "zustand";

interface sessionStore {
  data: {
    session: Session | null | undefined;
    accessToken: string | null;
    user: UserData | null;
  };
  actions: {
    getSession: () => Session | null | undefined;
    getAccessToken: () => string | null;
    getUser: () => UserData | null;
    setSession: (session: Session) => void;
    setAccessToken: (accessToken: string) => void;
    setUser: (user: UserData) => void;
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
const useSessionStore = create<sessionStore>()((set, get) => ({
  data: {
    session: undefined,
    accessToken: null,
    user: null,
  },
  actions: {
    getSession: () => getSession(get),
    getAccessToken: () => getAccessToken(get),
    getUser: () => getUser(get),
    setSession: (session) => setSession(set, session),
    setAccessToken: (accessToken) => setAccessToken(set, accessToken),
    setUser: (userData) => setUser(set, userData),
  },
}));

export const useCurrentSession = () =>
  useSessionStore((state) => state.data.session);
export const useAccessToken = () =>
  useSessionStore((state) => state.data.accessToken);
export const useCurrentUser = () => useSessionStore((state) => state.data.user);
export const useSessionAction = () => useSessionStore((state) => state.actions);
