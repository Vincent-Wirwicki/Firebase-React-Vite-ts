import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  UserCredential,
  User,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  errorMessages: errorMessages;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | void>;
  signIn: (email: string, password: string) => Promise<UserCredential | void>;
  signInWithGoogle: () => Promise<UserCredential | void>;
  logout: () => Promise<void>;
}

interface AuthContextProvideType {
  children: React.ReactNode;
}

interface errorMessages {
  [key: string]: string;
}

interface authError {
  message: string;
}

const UserContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProvideType) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const errorMessages: errorMessages = {
    "user-not-found": "User not found",
    "email-already-in-use": "User already exists",
    "wrong-password": "Invalid password",
    "wrong-email": "Invalid email",
  };

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      currentUser !== null ? setUser(currentUser) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        errorMessages,
        isAuthModalOpen,
        setIsAuthModalOpen,
        createUser,
        logout,
        signIn,
        signInWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
