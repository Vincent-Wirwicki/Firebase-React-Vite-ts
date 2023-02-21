import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";

const SignIn: React.FC = () => {
  const { onCloseModal, setToggleSignUp, onChange, formData } = AuthModal();
  const { email, password } = formData;

  const onSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h3>Log In</h3>
      <input
        autoComplete="true"
        placeholder="email"
        className="form__input"
        value={email}
        id="email"
        onChange={e => onChange(e)}
        type="text"
        required
      />
      <input
        autoComplete="true"
        placeholder="password"
        className="form__input"
        value={password}
        id="password"
        onChange={e => onChange(e)}
        type="text"
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
