
import { Session } from "next-auth";
import { create } from "zustand";

interface sessionStore {
	data: {
		session: Session | null | undefined;
		accessToken: string;
	};
	actions :{
		getSession: () => Session | null | undefined;
		getAccessToken: () => string;
		setSession: (session: Session) => void;
		setAccessToken: (accessToken: string) => void; 
	}
};

	type StoreSetter = (helper: (state: sessionStore) => Partial<sessionStore>) => void;
	type StoreGetter = () => sessionStore;
	function getSession(get: StoreGetter) {
		const session = get().data.session;
		return session;
	}

	function getAccessToken(get: StoreGetter) {
		const accessToken = get().data.accessToken;
		return accessToken;
	}

	function setSession(set: StoreSetter, session: Session)
	{
		set(({ data }) => ({
			data: {
			  ...data,
			  session: session,
			},
		  }));
	}

	function setAccessToken(set: StoreSetter, accessToken: string)
	{
		set(({ data }) => ({
			data: {
			  ...data,
			  accessToken: accessToken
			},
		  }));
	}
	const useSessionStore = create<sessionStore>()((set, get) => ({
		data: {
			session: undefined,
			accessToken: "",
		},
		actions: {
			getSession: () => getSession(get),
			getAccessToken: () => getAccessToken(get),
			setSession: (session) => setSession(set, session),
			setAccessToken: (accessToken) => setAccessToken(set, accessToken),
		}
	}))

export const useCurrentSession = () => useSessionStore((state) => state.data.session)
export const useAccessToken = () => useSessionStore((state) => state.data.accessToken);
export const useSessionAction = () => useSessionStore((state) => state.actions);
