import { AuthModal } from "../../context/AuthModalContext";
import "../../styles/components/auth/form.css";

interface Props {
  type: string;
  value: string;
}

const InputForm: React.FC<Props> = ({ type, value }) => {
  const { onChange } = AuthModal();

  return (
    <input
      autoComplete="true"
      className="form__input"
      required
      type={type}
      placeholder={type}
      id={type}
      value={value}
      onChange={e => onChange(e)}
    />
  );
};

export default InputForm;
