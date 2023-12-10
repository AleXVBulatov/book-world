import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SingleProduct.module.scss";

import { addToCart, addToFavourites, selectFavourites } from "../../redux/user/userSlice";
import { isVavourite } from "../../utils/common";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import Rating from "../Raiting/Rating";

const Product = (props) => {
  const product = props;
  const [currentTab, setCurrentTab] = useState("description");
  const [currentImage, setCurrentImage] = useState();
  const favourites = useSelector(selectFavourites);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product.images.length) return;

    setCurrentImage(product.images[0]);
  }, [product.images, product.images.length]);

  return (
    <section className={styles.product}>
      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles["active-image"]}>
            <img src={currentImage} alt={product.title} />
          </div>
          <div className={styles.images}>
            {product.images.map((image, index) => {
              return <img src={image} alt={product.title} key={index} onClick={() => setCurrentImage(image)} />;
            })}
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.title}>{product.title}</h2>
          <h3 className={styles.author}>{product.author}</h3>
          <div className={styles.price}>{product.price} ₴</div>

          <div className={styles.tabs}>
            <button
              id="description"
              className={
                currentTab === "description" ? `${styles["btn-description"]} ${styles.active}` : `${styles["btn-description"]}`
              }
              onClick={(event) => setCurrentTab(event.target.id)}
            >
              Описание
            </button>
            <button
              id="characteristics"
              className={
                currentTab === "characteristics"
                  ? `${styles["btn-characteristics"]} ${styles.active}`
                  : `${styles["btn-characteristics"]}`
              }
              onClick={(event) => setCurrentTab(event.target.id)}
            >
              Характеристики
            </button>
          </div>

          <div className={styles.block}>
            <div className={styles.description} style={currentTab === "description" ? { display: "block" } : { display: "none" }}>
              <p className={styles.text}>{product.description}</p>
            </div>

            <ul
              className={styles.characteristics__list}
              style={currentTab === "characteristics" ? { display: "block" } : { display: "none" }}
            >
              {Object.values(product.other).map((elem, index) => {
                return (
                  <li className={styles.description__item} key={index}>
                    <span>{Object.keys(elem)[0]}: </span>
                    <p>{Object.values(elem)[0]}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.order}>
            <Rating rating={product.rating} starSize={24} fontSize={16} />

            <div className={styles.stock}>
              {product.qty ? (
                <span className={styles["in-stock"]}>В наличии</span>
              ) : (
                <span className={styles["out-of-stock"]}>Нет в наличии</span>
              )}
            </div>

            <div className={styles.buttons}>
              <button
                type="click"
                className={styles["icon-favourite"]}
                onClick={() => {
                  dispatch(addToFavourites(product));
                }}
              >
                {!isVavourite(favourites, product.id) ? <BsHeart size={16} /> : <BsHeartFill size={16} />}
              </button>
              <button
                type="click"
                className={`${styles["btn-buy"]} ${!product.qty && styles["btn-disabled"]}`}
                onClick={() => dispatch(addToCart({ book: { ...product } }))}
                disabled={!product.qty}
              >
                Купить
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
