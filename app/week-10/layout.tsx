import { AuthContextProvider } from "./_utils/auth-context";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
 
export default Layout;