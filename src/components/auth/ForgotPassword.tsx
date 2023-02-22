import { AuthModal } from "../../context/AuthModalContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";

const ForgotPassword = () => {
  const { onChange, formData } = AuthModal();
  const { email } = formData;
  const onSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h3>Forgot Password</h3>
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
      {/* <input
        autoComplete="true"
        placeholder="password"
        className="form__input"
        value={password}
        id="password"
        onChange={e => onChange(e)}
        type="password"
        required
      /> */}
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgotPassword;
