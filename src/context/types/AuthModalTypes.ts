export interface AuthModalContextType {
  formData: FormDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  forms: FormsType;
  activeForm: (e: React.MouseEvent<HTMLSpanElement>) => void;
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModal: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormDataTypes {
  // email: string;
  // userName: string;
  // password: string;
  [k: string]: string;
}

export interface FormsType {
  [k: string]: boolean;
}

export interface AuthModalContextProviderType {
  children: React.ReactNode;
}
