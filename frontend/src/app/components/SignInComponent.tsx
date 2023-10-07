"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import callAPI from "../libs/CallApi";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useSessionAction } from "../libs/stores/useSessionStore";

interface signInProps {
  session: Session | null | undefined;
}
export default function SignInComponent({ session }: signInProps) {
  const sessionAction = useSessionAction();
  if (session && session.access_token) {
    sessionAction.setAccessToken(session.access_token);
    sessionAction.setSession(session);
  }
  return (
    <div>
      {session ? (
        <div>
          <p>Welcome {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={() => signIn("42-school")}>Sign in</button>
        </div>
      )}
    </div>
  );
}
