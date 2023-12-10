import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SingleCategory.module.scss";

import { useGetProductsQuery } from "../../redux/api/apiSlice";
import { setProductsAmountOnPage, selectProductsAmountOnPage, selectFilters } from "../../redux/user/userSlice";

import Category from "./Category";
import FilterShowMore from "../Filter/FilterShowMore";

const SingleCategory = () => {
  const { slug } = useParams();
  const filters = useSelector(selectFilters);
  const amount = useSelector(selectProductsAmountOnPage);
  const dispatch = useDispatch();

  const [value, setValue] = useState(amount);
  let [items, setItems] = useState(amount);

  const { data, isLoading, isSuccess } = useGetProductsQuery({
    ...filters,
    categorySlug: slug,
    offset: 0,
    limit: items,
  });

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  const addMoreFunction = () => {
    let sum = Number(items);
    setItems((sum += Number(amount)));
  };

  useEffect(() => {
    setItems(amount);
    dispatch(setProductsAmountOnPage(value));
  }, [slug, amount, dispatch, value]);

  return isLoading ? (
    <div className={styles.preloader}>Loading...</div>
  ) : isSuccess && !data.length ? (
    <div className={styles.back}>По вашему запросу ничего не найдено</div>
  ) : !isSuccess ? (
    <div className={styles.back}>Товар не найден</div>
  ) : (
    <div className={styles.column}>
      <Category products={data} isLoading isSuccess />

      <FilterShowMore addMoreFunction={addMoreFunction} handleChange={handleChange} value={value} items={items} data={data} />
    </div>
  );
};

export default SingleCategory;

// некорректно работает:
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import styles from "./SingleCategory.module.scss";

// import { useGetProductsQuery } from "../../redux/api/apiSlice";
// import {
//   // selectProductsQuantityOnPage,
//   // setProductsQuantityOnPage, // вкл
//   selectProductsAmountOnPage,
//   selectCurrentSlug,
//   selectFilters,
//   setCurrentSlug,
// } from "../../redux/user/userSlice";

// import { selectProductsQuantityOnPage, setProductsQuantityOnPage } from "../../redux/products/productsSlice";

// import Category from "./Category";
// import FilterShowMore from "../Filter/FilterShowMore";

// const SingleCategory = () => {
//   const { slug } = useParams();
//   const dispatch = useDispatch();

//   const filters = useSelector(selectFilters);
//   const amount = useSelector(selectProductsAmountOnPage);
//   const quantity = useSelector(selectProductsQuantityOnPage); // вкл
//   const currentSlug = useSelector(selectCurrentSlug);

//   const { data, isLoading, isSuccess } = useGetProductsQuery({
//     ...filters,
//     categorySlug: slug,
//     offset: 0,
//     limit: quantity,
//   });

//   // console.log("до эффекта", quantity);
//   useEffect(() => {
//     if (!quantity) return;
//     if (amount === quantity && isLoading) return;
//     // console.log("старт", quantity);
//     dispatch(setProductsQuantityOnPage(amount)); // вкл
//   }, []);

//   useEffect(() => {
//     if (slug !== currentSlug) {
//       // console.log("переход", quantity);
//       console.log("переход");
//       dispatch(setProductsQuantityOnPage(amount)); // вкл
//       dispatch(setCurrentSlug(slug));
//     }
//   }, [dispatch, slug, currentSlug, amount, data, quantity]);

//   return isLoading ? (
//     <div className={styles.preloader}>Loading...</div>
//   ) : isSuccess && !data.length ? (
//     <div className={styles.back}>По вашему запросу ничего не найдено</div>
//   ) : !isSuccess ? (
//     <div className={styles.back}>Товар не найден</div>
//   ) : (
//     <div className={styles.column}>
//       <Category products={data} isLoading isSuccess />

//       <FilterShowMore data={data} quantity={quantity} />
//     </div>
//   );
// };

// export default SingleCategory;
