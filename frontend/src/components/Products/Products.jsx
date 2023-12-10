import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Products.module.scss";

// import { filterByCategory, selectProducts } from "../../redux/products/productsSlice";
import { selectFilters } from "../../redux/user/userSlice";
import { addToCart, addToFavourites, selectFavourites } from "../../redux/user/userSlice";
import { isVavourite } from "../../utils/common";

import Rating from "../Raiting/Rating";
import RatingMini from "../RatingMini/RatingMini";
import highlightMatch from "../../utils/highlightMatch";

import { BsHeart, BsHeartFill } from "react-icons/bs";

const Products = (props) => {
  const { products, amount, columns, ratingMini } = props;

  const listAmount = products.filter((el, i) => (!amount ? el : i < amount && el));

  const dispatch = useDispatch();
  const searchValue = useSelector(selectFilters).title;
  const favourites = useSelector(selectFavourites);

  // const { slug } = useParams();
  // const selector = useSelector(selectProducts);

  // useEffect(() => {
  //   dispatch(filterByCategory(slug));
  // }, [dispatch, slug, selector?.length]);

  return (
    <section className={styles.products}>
      <div className={styles.list} style={amount ? { flexWrap: "wrap" } : { flexWrap: "nowrap" }}>
        {listAmount.map((product, index) => {
          return (
            <div key={index} className={styles.card} style={{ flexBasis: `${100 / columns}%` }}>
              <div className={styles.content}>
                <Link to={`/categories/${product.category.slug}/${product.id}`} className={styles.image}>
                  <img src={product.images[0]} alt={product.title} />
                </Link>

                <div className={styles.wrapper}>
                  <Link to={`/categories/${product.category.slug}/${product.id}`} className={styles.description}>
                    <h2 className={styles.title}>{highlightMatch(product.title, searchValue)}</h2>
                    <h3 className={styles.author}>{highlightMatch(product.author, searchValue)}</h3>
                    <p className={styles.price}>{product.price} ₴</p>
                  </Link>

                  <div className={styles.order}>
                    <div className={styles.info}>
                      {ratingMini ? (
                        <RatingMini rating={product.rating} starSize={20} fontSize={14} />
                      ) : (
                        <Rating rating={product.rating} starSize={20} fontSize={14} />
                      )}
                      <div className={styles.stock}>
                        {product.qty ? (
                          <span className={styles["in-stock"]}>В наличии</span>
                        ) : (
                          <span className={styles["out-of-stock"]}>Нет в наличии</span>
                        )}
                      </div>
                    </div>

                    <div className={styles.buttons}>
                      <button
                        type="click"
                        className={`${styles["btn-buy"]} ${!product.qty && styles["btn-disabled"]}`}
                        onClick={() => dispatch(addToCart({ book: { ...product } }))}
                        disabled={!product.qty}
                      >
                        Купить
                      </button>

                      <button
                        type="click"
                        className={styles["icon-favourite"]}
                        onClick={() => {
                          dispatch(addToFavourites(product));
                        }}
                      >
                        {!isVavourite(favourites, product.id) ? <BsHeart size={16} /> : <BsHeartFill size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
