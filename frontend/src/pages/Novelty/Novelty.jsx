import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Novelty.module.scss";

import { useGetProductsQuery } from "../../redux/api/apiSlice";
import { selectFilters, setProductsAmountOnPage, selectProductsAmountOnPage } from "../../redux/user/userSlice";

import Products from "../../components/Products/Products";
import FilterShowMore from "../../components/Filter/FilterShowMore";

const Novelty = () => {
  const filters = useSelector(selectFilters);
  const amount = useSelector(selectProductsAmountOnPage);
  const dispatch = useDispatch();

  const [value, setValue] = useState(amount);
  let [items, setItems] = useState(amount);

  const { data, isLoading, isSuccess } = useGetProductsQuery({
    ...filters,
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
  }, [amount, dispatch, value]);

  return isLoading ? (
    <div className={styles.preloader}>Loading...</div>
  ) : isSuccess && !data.length ? (
    <div className={styles.back}>По вашему запросу ничего не найдено</div>
  ) : !isSuccess ? (
    <div className={styles.back}>Товар не найден</div>
  ) : (
    <div className={styles.column}>
      <Products products={data} amount={data.length} columns={4} />

      <FilterShowMore addMoreFunction={addMoreFunction} handleChange={handleChange} value={value} items={items} data={data} />
    </div>
  );
};

export default Novelty;

// некорректно работает:
//   import React, { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import styles from "./Novelty.module.scss";

// import { useGetProductsQuery } from "../../redux/api/apiSlice";
// import {
//   selectFilters,
//   selectProductsAmountOnPage,
//   selectProductsQuantityOnPage,
//   selectCurrentSlug,
//   setProductsQuantityOnPage,
//   setCurrentSlug,
// } from "../../redux/user/userSlice";

// import Products from "../../components/Products/Products";
// import FilterShowMore from "../../components/Filter/FilterShowMore";

// const Novelty = () => {
//   const filters = useSelector(selectFilters);
//   const amount = useSelector(selectProductsAmountOnPage);
//   const quantity = useSelector(selectProductsQuantityOnPage);
//   const currentSlug = useSelector(selectCurrentSlug);
//   const dispatch = useDispatch();

//   console.log(currentSlug);

//   const { data, isLoading, isSuccess } = useGetProductsQuery({
//     ...filters,
//     offset: 0,
//     limit: quantity,
//   });

//   useEffect(() => {
//     if (!amount || !quantity) return;
//     if (currentSlug !== "") {
//       dispatch(setProductsQuantityOnPage(amount));
//       dispatch(setCurrentSlug(""));
//     }
//   }, [dispatch, amount, currentSlug, quantity]);

//   return isLoading ? (
//     <div className={styles.preloader}>Loading...</div>
//   ) : isSuccess && !data.length ? (
//     <div className={styles.back}>По вашему запросу ничего не найдено</div>
//   ) : !isSuccess ? (
//     <div className={styles.back}>Товар не найден</div>
//   ) : (
//     <div className={styles.column}>
//       <Products products={data} amount={data.length} columns={4} />

//       <FilterShowMore data={data} />
//     </div>
//   );
// };

// export default Novelty;
