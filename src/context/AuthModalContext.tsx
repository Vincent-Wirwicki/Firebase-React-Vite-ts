import { useState, useContext, createContext } from "react";
import {
  AuthModalContextType,
  AuthModalContextProviderType,
  FormDataTypes,
  FormsType,
} from "./types/AuthModalTypes";

const AuthModalContext = createContext({} as AuthModalContextType);

export const AuthModalContextProvider = ({
  children,
}: AuthModalContextProviderType) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataTypes>({
    email: "",
    password: "",
    userName: "",
  });

  const [forms, setForms] = useState<FormsType>({
    forgotPassword: false,
    signIn: true,
    signUp: false,
  });

  const resetFormsToFalse = (): void => {
    const resetToFalse = Object.fromEntries(
      Object.entries(forms).map(([key, value]) => [key, false])
    );
    return setForms(resetToFalse);
  };

  const displayForm = (e: React.MouseEvent<HTMLSpanElement>): void => {
    const { displayForm } = (e.target as HTMLSpanElement).dataset;
    if (displayForm !== undefined)
      setForms(prevState => ({
        ...prevState,
        [displayForm]: true,
      }));
  };

  const activeForm = (e: React.MouseEvent<HTMLSpanElement>): void => {
    resetFormsToFalse();
    displayForm(e);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    forms,
    activeForm,
    setFormData,
    setToggleModal,
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
