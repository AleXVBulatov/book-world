import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Header.module.scss";
import ROUTES from "../../utils/routes.js";
import logo from "../../images/logo/logo-header.png";
import { toggleForm, selectUser, selectCart, selectFavourites } from "../../redux/user/userSlice.js";

import { BsSearch, BsTelephone, BsHeart, BsCart } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { PiUserLight } from "react-icons/pi";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const favourites = useSelector(selectFavourites);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.top}>
          <div className="container">
            <div className={styles.row}>
              <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                  <img src={logo} alt="Logo" />
                </Link>
              </div>

              <form className={styles.form}>
                <div className={styles.input}>
                  <input
                    type="text"
                    name="search"
                    value={searchValue}
                    placeholder="Поиск"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                {!searchValue ? (
                  <BsSearch size={18} className={styles["icon-search"]} />
                ) : (
                  <IoClose size={18} className={styles["icon-close"]} onClick={() => setSearchValue("")} />
                )}

                {searchValue && (
                  <div className={styles.searchBox}>
                    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                  </div>
                )}
              </form>

              <div className={styles.info}>
                <BsTelephone size={20} className={styles["icon-telephone"]} />
                <span>0-800-811-822</span>
              </div>

              <div className={styles.account}>
                <div className={styles.row}>
                  <Link to={ROUTES.FAVOURITES} className={styles.groups}>
                    <BsHeart size={20} />
                    {!!favourites.length && <span className={styles.count}>{favourites.length}</span>}
                  </Link>
                  <Link to={ROUTES.CART} className={styles.groups}>
                    <BsCart size={22} />
                    {!!cart.length && <span className={styles.count}>{cart.length}</span>}
                  </Link>

                  <div className={styles.login}>
                    {!currentUser ? (
                      <div
                        className={styles.user}
                        onClick={() => {
                          dispatch(toggleForm(true));
                        }}
                      >
                        <PiUserLight size={28} />
                      </div>
                    ) : (
                      <div
                        className={styles.user}
                        onClick={() => {
                          navigate("profile");
                        }}
                      >
                        <img src={`${currentUser.avatar}`} alt="Avatar" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
