'use client'
import { useSession, signIn, signOut } from 'next-auth/react';


export default function SignInComponent() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <p>Welcome</p>
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

