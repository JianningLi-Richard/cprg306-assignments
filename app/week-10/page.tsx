"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div>
      {user ? (
        <>
          <p>
            Welcome, {user.displayName ??
                user?.providerData?.[0]?.displayName ??
                (user?.email ? user.email.split('@')[0] : 'User')} ({user.email})
          </p>
          <button onClick={() => firebaseSignOut()}>Sign out</button><br/>
          <Link href="/week-10/shopping-list">
            <button>Shopping List</button>
          </Link>
        </>
      ) : (
        <button onClick={() => gitHubSignIn()}>Sign in with GitHub</button>
      )}
    </div>
  );
}