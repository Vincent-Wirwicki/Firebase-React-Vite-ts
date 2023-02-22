import { useState, useContext, createContext } from "react";
import {
  AuthModalContextType,
  FormDataTypes,
  AuthModalContextProviderType,
} from "./types/AuthModalTypes";

const AuthModalContext = createContext({} as AuthModalContextType);

export const AuthModalContextProvider = ({
  children,
}: AuthModalContextProviderType) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [toggleSignUp, setToggleSignUp] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormDataTypes>({
    email: "",
    password: "",
    userName: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onCloseModal = (): void => {
    setToggleModal(false);
    setFormData({ email: "", password: "", userName: "" });
  };

  const value = {
    formData,
    toggleModal,
    setFormData,
    setToggleModal,
    toggleSignUp,
    setToggleSignUp,
    onCloseModal,
    onChange,
  };

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const AuthModal = () => {
  return useContext(AuthModalContext);
};
