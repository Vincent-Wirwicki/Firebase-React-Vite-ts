import { onAuthStateChanged, User } from "firebase/auth";
import { useState, useContext, createContext, useEffect } from "react";
import { auth } from "../firebase/firebase";

interface AuthUserContextType {
  user: User | null;
  isLoading: boolean;
}

interface AuthUserProviderType {
  children: React.ReactNode;
}

const AuthUserContext = createContext({} as AuthUserContextType);

export const AuthUserContextProvider = ({ children }: AuthUserProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
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
