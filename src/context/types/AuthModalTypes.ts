export interface AuthModalContextType {
  formData: FormDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSignUp: boolean;
  setToggleSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModal: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormDataTypes {
  email: string;
  userName: string;
  password: string;
}

export interface AuthModalContextProviderType {
  children: React.ReactNode;
}
