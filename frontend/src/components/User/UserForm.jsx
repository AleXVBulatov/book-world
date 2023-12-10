import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./UserForm.module.scss";
import { selectForm, toggleForm, toggleFormType, selectFormType, selectMessage } from "../../redux/user/userSlice";

import UserLoginForm from "./UserLoginForm";
import UserSignupForm from "./UserSignupForm";
import { IoMdClose } from "react-icons/io";

const UserForm = () => {
  const dispatch = useDispatch();
  const showForm = useSelector(selectForm);
  const currentForm = useSelector(selectFormType);
  const message = useSelector(selectMessage);

  const closeForm = () => {
    dispatch(toggleForm(!showForm));
  };

  const changeFormType = (type) => {
    dispatch(toggleFormType(type));
  };

  return (
    showForm && (
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div
            className={styles.overlay}
            onClick={() => {
              closeForm();
            }}
          ></div>
          <div className={styles.block}>
            <IoMdClose
              size={26}
              className={styles["btn-close"]}
              onClick={() => {
                closeForm();
              }}
            />
            {currentForm === "login" ? (
              <UserLoginForm changeFormType={changeFormType} closeForm={closeForm} />
            ) : (
              <UserSignupForm changeFormType={changeFormType} />
            )}
            {message && <div className={styles.message}>{message}</div>}
          </div>
        </div>
      </div>
    )
  );
};

export default UserForm;
