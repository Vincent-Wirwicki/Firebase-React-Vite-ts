interface Props {
  type: string;
  style: string;
}

const Input: React.FC<Props> = ({ type, style }) => {
  return <input type={type} className={style} />;
};

export default Input;
