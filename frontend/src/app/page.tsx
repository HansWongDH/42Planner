'use client'
import { useSession, signIn, signOut, SessionProvider, getSession } from 'next-auth/react';
import SignInComponent from './components/SignInComponent';
import { useEffect, useState } from 'react';
import { Session } from 'next-auth';

function Homepage() {
  const [session, setSession] = useState<Session | null | undefined>();
  useEffect(() => {
    async function fetchSession() {
      const newSession = await getSession();
      setSession(newSession)
    }
    fetchSession();
  }, []);
  return (
    <SignInComponent session={session} />
  )
}

export default Homepage;