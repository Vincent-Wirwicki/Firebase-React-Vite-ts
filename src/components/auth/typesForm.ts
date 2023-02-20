import { SetStateAction } from "react";

export interface AuthFormPropsType {
  setToggleSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  // password: string;
  // setPassword: React.Dispatch<SetStateAction<string>>;
  // email: string;
  // setEmail: React.Dispatch<SetStateAction<string>>;
  // userName: string;
  // setUserName: React.Dispatch<SetStateAction<string>>;
  onCloseModal: () => void;
  formData: FormDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormDataTypes {
  email: string;
  userName: string;
  password: string;
}
