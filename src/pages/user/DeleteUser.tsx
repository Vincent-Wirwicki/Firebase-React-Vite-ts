import { useEffect, useState } from "react";
import { deleteUser, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import useDebounce from "../../hooks/useDebounce";
import "../../styles/pages/user/deleteUser.css";

interface Props {
  email: string | null;
}

const DeleteUser: React.FC<Props> = ({ email }) => {
  const [toggleDelete, setToggleDelete] = useState<boolean>(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState<boolean>(false);
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const debouncedValue = useDebounce<string>(confirmEmail, 500);

  useEffect(() => {
    confirmEmail === email ? setIsEmailConfirm(true) : setIsEmailConfirm(false);
  }, [debouncedValue]);

  const onDelete = async () => {
    if (auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
        // await signOut(auth);
      } catch (error) {}
    }
  };

  return (
    <div className="delete__user__wrap">
      <div className="delete__user__toggle__form">
        <h3>Delete account</h3>
        <h3
          className={`delete__user__toggle__btn ${
            toggleDelete && "btn__toggle__on"
          }`}
          onClick={() => {
            setToggleDelete(!toggleDelete);
            if (confirmEmail.length > 0) setConfirmEmail("");
          }}
        >
          +
        </h3>
      </div>
      {toggleDelete && (
        <div className="delete__user__confirm__form">
          <p>Type your email adress to delete your account : </p>
          <input
            className={
              isEmailConfirm
                ? "delete__user__input__confirm"
                : "delete__user__input__not__confirm"
            }
            type="text"
            value={confirmEmail}
            onChange={e => setConfirmEmail(e.target.value)}
          />
          <button
            onClick={() => {
              isEmailConfirm
                ? onDelete()
                : setError("confirm your email before");
            }}
          >
            Delete
          </button>
          <div>{error.length > 0 && error}</div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
