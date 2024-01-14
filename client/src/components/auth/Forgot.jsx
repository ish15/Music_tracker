import "./Auth.scss";
import logo from "../../img/logo.svg";
import { useDispatch, useSelector, useStore } from "react-redux";
import { forgotPassword } from "../../store/thunks/user";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import isValidEmail from "./isValidEmail";
import { toast } from "react-toastify";

const Forgot = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return toast.warn("Email is not valid");
    }

    dispatch(forgotPassword({ email }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleFormSubmit}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo" />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">{loading ? "Loading" : "Send Token"}</button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Forgot;
