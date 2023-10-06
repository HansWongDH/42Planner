'use client'
import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react';
import SignInComponent from './components/SignInComponent';

function MyApp() {
  return (
    <SessionProvider>
      <SignInComponent />
    
    </SessionProvider>
  );
}

export default MyApp;