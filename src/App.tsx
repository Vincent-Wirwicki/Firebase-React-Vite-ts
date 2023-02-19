import Header from "./components/header/Header";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import ModalAuth from "./components/auth/ModalAuth";
import { User } from "firebase/auth";
import CRUDoperation from "./components/CRUD/CRUDoperation";

interface UserType {
  user: User | null;
}

const App = () => {
  // console.log(user);
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <ModalAuth />
        <CRUDoperation />
      </AuthContextProvider>
    </div>
  );
};

export default App;
