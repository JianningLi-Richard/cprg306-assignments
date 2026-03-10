import { useUserAuth } from "./_utils/auth-context";
 
const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
 
await gitHubSignIn();
 
await firebaseSignOut();
 
{user && (
  <p>
    Welcome, {user.displayName} ({user.email})
  </p>
)}