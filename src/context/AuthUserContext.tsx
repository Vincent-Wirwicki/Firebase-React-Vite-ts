import { onAuthStateChanged, User } from "firebase/auth";
import { useState, useContext, createContext, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthUserContextType {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  // createUser: (email: string, password: string) => void;
  isLoading: boolean;
}

interface AuthUserProviderType {
  children: React.ReactNode;
}

const AuthUserContext = createContext({} as AuthUserContextType);

export const AuthUserContextProvider = ({ children }: AuthUserProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  // const [user, error, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      // setUser(currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
  };

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const AuthUser = () => {
  return useContext(AuthUserContext);
};
