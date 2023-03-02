import { AuthModal } from "../../context/AuthModalContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "../../styles/components/auth/form.css";
import InputForm from "./InputForm";
import { useState } from "react";

const ForgotPassword = () => {
  const { formData } = AuthModal();
  const { email } = formData;
  const [message, setMessage] = useState<string>("");
  const onSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("An email was send");
    } catch (error) {
      setMessage("email do not exist");
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <h3>Forgot Password</h3>
      <InputForm type={"email"} value={email} />
      <p>{message.length > 0 && message}</p>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgotPassword;
