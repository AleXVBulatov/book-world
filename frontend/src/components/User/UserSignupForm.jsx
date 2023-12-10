import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./UserForm.module.scss";
import { createUser, selectMessage, setMessage } from "../../redux/user/userSlice";

const UserSignupForm = (props) => {
  const { changeFormType } = props;
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const { email, password, name, avatar } = values;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);
    if (!isNotEmpty) return;

    const newUser = {
      email,
      password,
      name,
      avatar,
    };

    dispatch(createUser(newUser));
  };

  useEffect(() => {
    if (message === "Профиль создан") {
      setValues({ email: "", password: "", name: "", avatar: "" });
      changeFormType("login");
    }
  }, [dispatch, changeFormType, setValues, message]);

  return (
    <div className={styles["user-form"]}>
      <h2 className={styles.title}>Sign Up</h2>
      <form method="POST" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => handleChange(event)}
            placeholder="Your email"
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => handleChange(event)}
            placeholder="Your password"
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(event) => handleChange(event)}
            placeholder="Your name"
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="avatar"
            name="avatar"
            value={avatar}
            onChange={(event) => handleChange(event)}
            placeholder="Your avatar"
            required
          />
        </div>

        <div
          className={styles.text}
          onClick={() => {
            changeFormType("login");
            dispatch(setMessage(""));
          }}
        >
          У меня уже есть аккаунт
        </div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
