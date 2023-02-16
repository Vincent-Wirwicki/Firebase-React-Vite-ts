import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import "../../styles/components/header/header.css";

interface Props {}

const Header: React.FC<Props> = () => {
  const { user, logout, setIsAuthModalOpen } = UserAuth();

  return (
    <header>
      <h1>_.Logo</h1>
      {!user ? (
        <button onClick={() => setIsAuthModalOpen(true)}>
          Sign Up / Sign In
        </button>
      ) : (
        <button onClick={logout}>logout</button>
      )}
    </header>
  );
};

export default Header;
