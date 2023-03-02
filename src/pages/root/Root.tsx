import { Outlet } from "react-router-dom";
import ModalAuth from "../../components/auth/ModalAuth";
import Header from "../../components/header/Header";

const Root = () => {
  return (
    <>
      <Header />
      <ModalAuth />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
