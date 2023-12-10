import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsTelegram } from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";

import styles from "./Footer.module.scss";
import ROUTES from "../../utils/routes";
import logo from "../../images/logo/logo-footer.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.line}></div>

        <div className={styles.row}>
          <div className={styles.logo}>
            <Link to={ROUTES.HOME}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <span>Developed by Alexey</span>

          <div className={styles.socials}>
            <a href="https://www.linkedin.com/in/alexey-bulatov/" target="_blanc">
              <BsLinkedin size={20} />
            </a>
            <a href="https://github.com/AleXVBulatov" target="_blanc">
              <BsGithub size={20} />
            </a>
            <a href="https://t.me/AleXVBulatov" target="_blanc">
              <BsTelegram size={20} />
            </a>
            <a href="mailto:bulatov.a.v.89@gmail.com" target="_blanc">
              <AiFillMail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
