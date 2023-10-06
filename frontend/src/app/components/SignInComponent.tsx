'use client'
import { useSession, signIn, signOut } from 'next-auth/react';
import callAPI from '../libs/CallApi';
import { useEffect } from 'react';


export default function SignInComponent() {
  const { data: session } = useSession();

  useEffect(() => {
    const me = callAPI("GET", "me", session?.access_token?? "");
    console.log(session?.access_token);
  }, [session])

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
          <button onClick={() => signIn('42-school')}>Sign in</button>
        </div>
      )}
    </div>
  );
}

