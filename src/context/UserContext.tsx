import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface UserContextType {
  user: User | null;
}

interface UserContextProviderType {
  children: React.ReactNode;
}

export const userContext = createContext({} as UserContextType);

// const UserContext = createContext({} as UserContextType);

// export const UserContextProvider = ({ children }: UserContextProviderType) => {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const [user, loading, error] = useAuthState(auth);
//     if(user !== undefined)setUser(user)
//     return () => {

//     };
//   }, []);

//   return (
//     <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
//   );
// };

// const [user, loading, error] = useAuthState(auth);
