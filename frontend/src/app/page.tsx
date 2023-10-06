'use client'
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Auth() {
  return (
    <div>
      <h1>Welcome to My App</h1>
        <button onClick={() => signIn('42-school')}>Sign in with 42 School</button>
    </div>
  );
}