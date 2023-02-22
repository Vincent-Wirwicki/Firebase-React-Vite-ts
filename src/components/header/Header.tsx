import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/firebase";
import "../../styles/components/header/header.css";

interface Props {}

const Header: React.FC<Props> = () => {
  const { setToggleModal } = AuthModal();
  const [user, error, loading] = useAuthState(auth);

  return (
    <header>
      <h1>_.Logo</h1>
      {!user ? (
        <button onClick={() => setToggleModal(true)}>Sign Up / Sign In</button>
      ) : (
        <button onClick={() => signOut(auth)}>logout</button>
      )}
    </header>
  );
};

export default Header;
