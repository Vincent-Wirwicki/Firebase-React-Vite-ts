import "../../styles/components/auth/form.css";

interface Props {
  type: string;
  value: string;
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Input: React.FC<Props> = ({ type, value, placeHolder, onChange }) => {
  return (
    <input
      autoComplete="true"
      className="form__input"
      required
      type={type}
      placeholder={placeHolder}
      data-value={value}
      value={value}
      onChange={e => onChange(e)}
    />
  );
};

export default Input;
