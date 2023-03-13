import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/firebase";
import "../../styles/components/header/header.css";
import { Link } from "react-router-dom";

interface Props {}

const Header: React.FC<Props> = () => {
  const { setToggleModal } = AuthModal();
  const [user, error, loading] = useAuthState(auth);

  console.log(auth.currentUser);
  return (
    <header>
      <Link to="/" className="link__style">
        <h1>_.Logo</h1>
      </Link>

      {!user ? (
        <button onClick={() => setToggleModal(true)}>Sign Up / Sign In</button>
      ) : (
        <nav>
          <Link to="/user" className="link__style">
            my account
          </Link>
          <div onClick={() => signOut(auth)}>logout</div>
        </nav>
      )}
    </header>
  );
};

export default Header;
