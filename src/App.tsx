import Header from "./components/header/Header";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import ModalAuth from "./components/auth/ModalAuth";

const App = () => {
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
