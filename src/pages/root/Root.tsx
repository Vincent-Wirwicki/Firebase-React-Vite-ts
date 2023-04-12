import { Outlet } from "react-router-dom";
import ModalAuth from "../../components/auth/ModalAuth";
import Header from "../../components/header/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

const Root = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Header />
      {!user ? <ModalAuth /> : null}
      <>
        <Outlet />
      </>
    </>
  );
};

export default Root;
