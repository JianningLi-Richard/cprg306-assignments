"use client";

import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div>
      {user ? (
        <p>
          Welcome, {user.displayName} ({user.email})
        </p>
      ) : (
        <button onClick={() => gitHubSignIn()}>Sign in with GitHub</button>
      )}
      {user && (
        <button onClick={() => firebaseSignOut()}>Sign out</button>
      )}
    </div>
  );
}