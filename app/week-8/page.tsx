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
            Welcome, {user.displayName} ({user.email})
          </p>
          <button onClick={() => firebaseSignOut()}>Sign out</button><br/>
          <Link href="/week-8/shopping-list">
            <button>Shopping List</button>
          </Link>
        </>
      ) : (
        <button onClick={() => gitHubSignIn()}>Sign in with GitHub</button>
      )}
    </div>
  );
}