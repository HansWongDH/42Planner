import callAPI from "@/app/libs/CallApi";
import {
  useAccessToken,
  useCurrentSession,
  useCurrentUser,
  useSessionAction,
} from "@/app/libs/stores/useSessionStore";
import { Avatar, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect } from "react";

export default function CadetProfile() {
  const currentSession = useCurrentSession();
  const sessionAction = useSessionAction();
  const accessToken = useAccessToken();
  const userData = useCurrentUser();

  useEffect(() => {
    async function fetchPersonalData(accessToken: string) {
      const data = await callAPI("GET", "me", accessToken);
      sessionAction.setUser(data.body);
    }
    if (accessToken) {
      fetchPersonalData(accessToken);
    }
  }, [accessToken]);

  if (!currentSession || !accessToken || !userData) return;
  return (
    <Wrap>
      <WrapItem>
        <Avatar size="2xl" name="lmao" src={currentSession.avatarURL} />
        <Heading>{userData?.displayname}</Heading>
      </WrapItem>
    </Wrap>
  );
}
