import Header from "./components/header/Header";
// import { AuthContextProvider } from "./context/AuthContext";
import { AuthModalContextProvider } from "./context/AuthModalContext";
import { AuthUserContextProvider } from "./context/AuthUserContext";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ModalAuth from "./components/auth/ModalAuth";

const App = () => {
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
