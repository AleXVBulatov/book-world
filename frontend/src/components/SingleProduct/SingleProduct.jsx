import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SingleProduct.module.scss";

import { selectProducts, selectProductsRelatedByAuthor, getRelatedProducts } from "../../redux/products/productsSlice";
import { getViewedProducts } from "../../redux/user/userSlice";

import Product from "./Product";
import Products from "../Products/Products";

const SingleProduct = () => {
  const { id } = useParams();
  const selector = useSelector(selectProducts);
  const data = selector.find((product) => product.id === id);

  const dispatch = useDispatch();
  const related = useSelector(selectProductsRelatedByAuthor);

  useEffect(() => {
    if (!data) return;
    dispatch(getRelatedProducts(data.author));
    dispatch(getViewedProducts(data));
  }, [dispatch, data]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <div className={styles.column}>
        <Product {...data} />
        <div className="line"></div>
        <h2 className={styles["section-title"]}>Книги данного автора</h2>
        <div className={styles.content}>
          <Products products={related} amount={null} columns={5} ratingMini />
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

// вариант 1 (через apiSlice):
// import React from "react";
// import { useParams } from "react-router-dom";

// import { useGetProductQuery } from "../../redux/api/apiSlice";

// import Product from "./Product";

// const SingleProduct = () => {
//   const { slug, id } = useParams();
//   const { data } = useGetProductQuery({ slug, id });

//   return !data ? <section className="preloader">Loading...</section> : <Product {...data} />;
// };

// export default SingleProduct;

// вариант 2 (Через строку запроса):
// import React from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { selectProducts } from "../../redux/products/productsSlice";

// import Product from "./Product";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const selector = useSelector(selectProducts);
//   const data = selector.find((product) => product.id === id);

//   return !data ? <section className="preloader">Loading...</section> : <Product {...data} />;
// };

// export default SingleProduct;

// вариант 3 (через productsSlice (getProduct reducer)):
// import React, { useEffect } from "react";
// import { getProduct, selectProductById } from "../../redux/products/productsSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import Product from "./Product";

// const SingleProduct = () => {
//   const selector = useSelector(selectProductById);
//   const { id } = useParams();

//   const data = selector[0];

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getProduct(id));
//   }, [dispatch, id]);

//   return !data ? <section className="preloader">Loading...</section> : <Product {...data} />;
// };

// export default SingleProduct;

// Предыдущий вариант с запросом на сервер через apiSlice:
// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// import styles from "./SingleProduct.module.scss";

// import { selectProductsfilterByAuthor, filterByAuthor } from "../../redux/products/productsSlice";
// import { useGetProductQuery } from "../../redux/api/apiSlice";
// import ROUTES from "../../utils/routes";

// import Product from "./Product";
// import Products from "../Products/Products";
// import { useDispatch, useSelector } from "react-redux";

// const SingleProduct = () => {
//   const { slug, id } = useParams();
//   const { data, isLoading, isSuccess, isFetching } = useGetProductQuery({ slug, id });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const related = useSelector(selectProductsfilterByAuthor);

//   useEffect(() => {
//     if (!isFetching && !isLoading && !isSuccess) {
//       navigate(ROUTES.HOME);
//     }
//   }, [isFetching, isLoading, isSuccess, navigate]);

//   useEffect(() => {
//     if (!data) return;
//     dispatch(filterByAuthor(data.author));
//   }, [dispatch, data]);

//   return !data ? (
//     <section className="preloader">Loading...</section>
//   ) : (
//     <>
//       <div className={styles.column}>
//         <Product {...data} />
//         <div className="line"></div>
//         <Products products={related} amount={5} title="Книги данного автора" columns={5} ratingMini />
//       </div>
//     </>
//   );
// };

// export default SingleProduct;
