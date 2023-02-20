import { useState, useContext, createContext } from "react";

interface AuthModalCTXType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModal: () => void;
}
interface AuthModalCTXProviderType {
  children: React.ReactNode;
}
const AuthModalCTX = createContext({} as AuthModalCTXType);
export const AuthModalCTXProvider = ({
  children,
}: AuthModalCTXProviderType) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSignUp, setIsSignUpd] = useState<boolean>(true);
  const onCloseModal = (): void => {
    setEmail("");
    setPassword("");
    setUserName("");
    setIsModalOpen(false);
    setIsSignUpd(true);
  };
  const value = {
    email,
    setEmail,
    password,
    setPassword,
    userName,
    setUserName,
    isModalOpen,
    setIsModalOpen,
    onCloseModal,
  };
  return (
    <AuthModalCTX.Provider value={value}>{children}</AuthModalCTX.Provider>
  );
};
