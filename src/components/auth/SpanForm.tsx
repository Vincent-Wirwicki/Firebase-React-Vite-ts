import { AuthModal } from "../../context/AuthModalContext";
import "../../styles/components/auth/form.css";

interface Props {
  content: string;
  display: string;
}
const SpanForm: React.FC<Props> = ({ content, display }) => {
  const { activeForm, setFormData } = AuthModal();

  return (
    <span
      className="form__span"
      data-display-form={display}
      onClick={e => {
        activeForm(e);
        setFormData({ email: "", password: "", userName: "" });
      }}
    >
      {content}
    </span>
  );
};

export default SpanForm;
