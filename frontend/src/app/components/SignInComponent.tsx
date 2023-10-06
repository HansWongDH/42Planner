'use client'
import { useSession, signIn, signOut } from 'next-auth/react';
import callAPI from '../libs/CallApi';
import { useEffect, useState } from 'react';


export default function SignInComponent() {
  const { data: session } = useSession();
  const [info, setInfo] = useState();

  let lmao;
  useEffect(() => {
    if (session && session.access_token)
     lmao = callAPI("GET", "expertises", session?.access_token);
    console.log(lmao);
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

