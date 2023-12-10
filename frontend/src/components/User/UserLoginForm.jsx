import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./UserForm.module.scss";
import { selectUser, loginUser, selectMessage } from "../../redux/user/userSlice";

const UserLoginForm = (props) => {
  const { changeFormType, closeForm } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const message = useSelector(selectMessage);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (currentUser && !message) {
      setValues({ email: "", password: "" });
      closeForm();
    }
  }, [closeForm, message, currentUser]);

  return (
    <div className={styles["user-form"]}>
      <h2 className={styles.title}>Login</h2>
      <form method="POST" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input type="name" name="email" value={email} onChange={handleChange} placeholder={"Your email"} required />
        </div>
        <div className={styles.group}>
          <input type="password" name="password" value={password} onChange={handleChange} placeholder="Your password" required />
        </div>

        <div
          className={styles.text}
          onClick={() => {
            changeFormType("signup");
          }}
        >
          Создать аккаунт
        </div>

        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
