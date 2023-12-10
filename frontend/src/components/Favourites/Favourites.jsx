import React from "react";
import { useSelector } from "react-redux";

import styles from "./Favourites.module.scss";

import { selectFavourites } from "../../redux/user/userSlice";

import Products from "../Products/Products";

const Favourites = () => {
  const favourites = useSelector(selectFavourites);

  return (
    <section className={styles.favourites}>
      <h2 className={styles["section-title"]}>Ваши избранные товары</h2>

      {!favourites.length ? (
        <div className={styles.empty}>В избранных пока ничего нет.</div>
      ) : (
        <Products products={favourites} amount={favourites.length} columns={5} ratingMini />
      )}
    </section>
  );
};

export default Favourites;
