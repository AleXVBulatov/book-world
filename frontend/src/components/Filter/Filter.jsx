import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Filter.module.scss";

import { getFilters, selectFilters } from "../../redux/user/userSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const storageValues = {
    title: filters.title || "",
    price_min: filters.price_min || "",
    price_max: filters.price_max || "",
    inStock: filters.inStock || false,
  };

  const [values, setValues] = useState({
    ...storageValues,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleChecked = (event) => {
    const { name, checked } = event.target;
    setValues({ ...values, [name]: checked });
  };

  const handleReset = () => {
    setValues({ title: "", price_min: "", price_max: "", inStock: false });
  };

  useEffect(() => {
    dispatch(getFilters(values));
  }, [dispatch, values]);

  return (
    <section className={styles.filter}>
      <div className={styles.content}>
        <h2 className={styles.title}>Фильтры</h2>
        <div className={styles["filter-title"]}>
          <input type="text" name="title" value={values.title} onChange={handleChange} placeholder="Название книги или автор" />
        </div>
        <div className={styles.row}>
          <div className={styles["filter-price"]}>
            <span>Min: </span>
            <input type="number" name="price_min" value={values.price_min} onChange={handleChange} placeholder="от" /> ₴
          </div>
          <div className={styles["filter-price"]}>
            <span>Max: </span>
            <input type="number" name="price_max" value={values.price_max} onChange={handleChange} placeholder="до" /> ₴
          </div>
        </div>
        <div className={styles["filter-stock"]}>
          <input type="checkbox" name="inStock" id="inStock" checked={values.inStock} onChange={handleChecked} />
          <label htmlFor="inStock">В наличии</label>
        </div>
        <button onClick={handleReset}>Сбросить все фильтры</button>
      </div>
    </section>
  );
};

export default Filter;
