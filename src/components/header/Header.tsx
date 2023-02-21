import { signOut } from "firebase/auth";
import { AuthModal } from "../../context/AuthModalContext";
import { AuthUser } from "../../context/AuthUserContext";
import { auth } from "../../firebase/firebase";
import "../../styles/components/header/header.css";

interface Props {}

const Header: React.FC<Props> = () => {
  const { setToggleModal } = AuthModal();
  const { user } = AuthUser();

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
