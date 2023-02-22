import Header from "./components/header/Header";
// import { AuthContextProvider } from "./context/AuthContext";
import { AuthModalContextProvider } from "./context/AuthModalContext";
import { AuthUser, AuthUserContextProvider } from "./context/AuthUserContext";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

import "./App.css";
import ModalAuth from "./components/auth/ModalAuth";

const App = () => {
  // const { user } = AuthUser();
  // console.log(user);
  const [user, error, loading] = useAuthState(auth);
  console.log(user);
  return (
    <div className="App">
      <AuthModalContextProvider>
        <AuthUserContextProvider>
          <Header />
          <ModalAuth />
        </AuthUserContextProvider>
      </AuthModalContextProvider>
    </div>
  );
};

export default App;
