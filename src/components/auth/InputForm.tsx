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
//   <input
//     autoComplete="true" -
//     placeholder="email"
//     className="form__input"
//     value={email}
//     id="email"
//     onChange={e => onChange(e)}
//     type="email"
//     required
//   />;
