import React from "react";
import { useLocation, useParams } from "react-router-dom";

import styles from "./Sidebar.module.scss";

import Categories from "../Categories/Categories";
import Filter from "../Filter/Filter";

const Sidebar = () => {
  const params = useParams();
  const { pathname } = useLocation(); // /novelty
  const isOnlyParamSlug = Object.keys(params);

  return (
    <section className={styles.sidebar}>
      <div className={styles.group}>
        <Categories />
        {(isOnlyParamSlug.length === 1 || pathname.slice(1) === "novelty") && <Filter />}
      </div>
    </section>
  );
};

export default Sidebar;
