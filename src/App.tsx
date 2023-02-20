import Header from "./components/header/Header";
import { AuthContextProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ModalAuth from "./components/auth/ModalAuth";

const App = () => {
  // console.log(user);
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <ModalAuth />
      </AuthContextProvider>
    </div>
  );
};

export default App;
