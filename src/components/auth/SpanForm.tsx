import { AuthModal } from "../../context/AuthModalContext";
import "../../styles/components/auth/form.css";

interface Props {
  content: string;
  display: string;
}
const SpanForm: React.FC<Props> = ({ display, content }) => {
  const { activeForm } = AuthModal();

  return (
    <span
      className="form__span"
      data-display-form={display}
      onClick={e => activeForm(e)}
    >
      {content}
    </span>
  );
};

export default SpanForm;
