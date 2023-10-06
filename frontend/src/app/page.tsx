'use client'
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Auth() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome to My App</h1>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('42-school')}>Sign in with 42 School</button>
      )}
    </div>
  );
}