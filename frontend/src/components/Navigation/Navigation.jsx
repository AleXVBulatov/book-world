import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.scss";
import { navigation } from "../../utils/constants";

const Navigation = (props) => {
  const { position, backgroundColor } = props;

  const link = `${position}-link`;
  const activeLink = `${position}-link-active`;

  return (
    <nav className={styles.nav} style={{ backgroundColor: backgroundColor }}>
      <div className="container">
        <nav>
          <ul className={styles.menu}>
            {navigation.map((nav, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={nav.route}
                    className={({ isActive }) => `${styles["link-common"]} ${isActive ? styles[activeLink] : styles[link]}`}
                  >
                    {nav.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navigation;
