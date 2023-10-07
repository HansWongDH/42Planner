'use client'
import { getSession } from 'next-auth/react';
import SignInComponent from './components/SignInComponent';
import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import ExampleApiCall from './components/exampleApiCall';

function Homepage() {
  const [session, setSession] = useState<Session | null | undefined>();
  useEffect(() => {
    async function fetchSession() {
      const newSession = await getSession();
      setSession(newSession)
    }
    fetchSession();
  }, []);
  return (<div>
    <SignInComponent session={session} />
    <ExampleApiCall></ExampleApiCall>
    </div>
  )
}

export default Homepage;