import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.scss";

import { selectUser, removeCurrentUser, updateUser } from "../../redux/user/userSlice";
import { IoMdClose } from "react-icons/io";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const currentUser = useSelector(selectUser);
  const { email, password, name, avatar } = values;

  useEffect(() => {
    if (!currentUser) return;

    setValues({
      email: currentUser.email,
      password: currentUser.password,
      name: currentUser.name,
      avatar: currentUser.avatar,
    });
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      email,
      password,
      name,
      avatar,
      id: currentUser.id,
    };

    dispatch(updateUser(updatedUser));
  };

  return !currentUser ? (
    <span className={styles.warning}>Вам нужно войти в аккаунт!</span>
  ) : (
    <>
      <div
        className={styles.overlay}
        onClick={() => {
          navigate("/");
        }}
      ></div>
      <div className={styles.profile}>
        <IoMdClose
          size={26}
          className={styles["btn-close"]}
          onClick={() => {
            navigate("/");
          }}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>Ваш профиль</h2>
          <form method="POST" className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.left}>{currentUser && <img src={`${currentUser.avatar}`} alt="Avatar" />}</div>

              <div className={styles.right}>
                <div className={styles.group}>
                  <label htmlFor="email">Ваш email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => handleChange(event)}
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="password">Ваш пароль:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => handleChange(event)}
                    placeholder="Your password"
                    required
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="password">Ваше имя:</label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(event) => handleChange(event)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className={styles.group}>
                  <label htmlFor="password">Ваш аватар:</label>
                  <input
                    type="avatar"
                    name="avatar"
                    id="avatar"
                    value={avatar}
                    onChange={(event) => handleChange(event)}
                    placeholder="Your avatar"
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <button type="submit" className={styles.submit}>
                Изменить профиль
              </button>

              <button
                type="button"
                className={`${styles.submit} ${styles["btn-exit"]}`}
                onClick={() => {
                  dispatch(removeCurrentUser(null));
                  navigate("/");
                }}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
