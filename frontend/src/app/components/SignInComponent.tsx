"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import callAPI from "../libs/CallApi";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import {
  useCurrentSession,
  useSessionAction,
} from "../libs/stores/useSessionStore";

interface signInProps {
  session: Session | null | undefined;
}
export default function SignInComponent() {
  const session = useCurrentSession();
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
