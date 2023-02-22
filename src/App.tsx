import Header from "./components/header/Header";
import { AuthModalContextProvider } from "./context/AuthModalContext";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import "./App.css";
import ModalAuth from "./components/auth/ModalAuth";

const App = () => {
  const [user, error, loading] = useAuthState(auth);
  return (
    <div className="App">
      <AuthModalContextProvider>
        <Header />
        <ModalAuth />
      </AuthModalContextProvider>
    </div>
  );
};
export default App;
