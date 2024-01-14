import "./Auth.scss";
import logo from "../../img/logo.svg";
import { Link, Navigate } from "react-router-dom";
import { signupUser } from "../../store/thunks/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import isValidEmail from "./isValidEmail";

const Signup = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm)
      return toast.warn("Passwords do not match");
    else if (!isValidEmail(email)) {
      return toast.warn("Email is not valid");
    }

    dispatch(signupUser({ name, email, password, passwordConfirm }));
  };

  return (
    <>
      {!user.auth ? (
        <div className="auth">
          <form className="auth__form" onSubmit={handleSignup}>
            <img className="auth__form-logo" src={logo} alt="Spotify logo" />
            <Link to="/login" className="auth__form-link">
              Log In here
            </Link>
            <input
              type="text"
              name="name"
              minLength="3"
              maxLength="24"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              minLength="8"
              maxLength="16"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="passwordConfirm"
              minLength="8"
              maxLength="16"
              placeholder="Password Confirm"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button type="submit">
              {user.loading ? "Loading" : "Sign Up"}
            </button>
          </form>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Signup;
