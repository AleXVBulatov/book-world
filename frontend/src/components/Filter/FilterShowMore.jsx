import React from "react";

import styles from "./Filter.module.scss";

const FilterShowMore = (props) => {
  const { addMoreFunction, handleChange, value, items, data } = props;

  return (
    <>
      <div
        className={styles["filter-amount"]}
        style={items <= data.length ? { justifyContent: "space-between" } : { justifyContent: "flex-end" }}
      >
        {items <= data.length && (
          <button type="button" id="btn-more" className={styles["btn-more"]} onClick={addMoreFunction}>
            Показать еще...
          </button>
        )}

        <div className={styles.group}>
          <span>Элементов на странице: </span>

          <select name="amount" onChange={handleChange} value={value}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterShowMore;

// некорректно работает:
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import styles from "./Filter.module.scss";

// import {
//   setProductsAmountOnPage,
//   // setProductsQuantityOnPage, // вкл
//   selectProductsAmountOnPage,
//   // selectProductsQuantityOnPage, // вкл
// } from "../../redux/user/userSlice";

// import { setProductsQuantityOnPage, selectProductsQuantityOnPage } from "../../redux/products/productsSlice";

// const FilterShowMore = (props) => {
//   const { data, quantity } = props;

//   const amount = useSelector(selectProductsAmountOnPage);
//   // const quantity = useSelector(selectProductsQuantityOnPage); // вкл
//   const dispatch = useDispatch();

//   const [value, setValue] = useState(amount);
//   let [items, setItems] = useState(quantity);

//   const handleChange = (event) => {
//     const { value } = event.target;
//     setValue(value);
//     setItems(value);
//   };

//   const addMoreFunction = () => {
//     let sum = Number(items);
//     setItems((sum += Number(amount)));
//   };

//   useEffect(() => {
//     if (quantity !== amount) {
//       console.log("hello");
//       dispatch(setProductsQuantityOnPage(quantity)); // вкл
//     }
//     console.log("hfh");
//     dispatch(setProductsQuantityOnPage(items)); // вкл
//     dispatch(setProductsAmountOnPage(Number(value)));
//   }, [amount, dispatch, value, items, data]);

//   return (
//     <>
//       <div
//         className={styles["filter-amount"]}
//         style={items <= data.length ? { justifyContent: "space-between" } : { justifyContent: "flex-end" }}
//       >
//         {items <= data.length && (
//           <button type="button" id="btn-more" className={styles["btn-more"]} onClick={addMoreFunction}>
//             Показать еще...
//           </button>
//         )}

//         <div className={styles.group}>
//           <span>Элементов на странице: </span>

//           <select name="amount" onChange={handleChange} value={value}>
//             <option value={2}>2</option>
//             <option value={4}>4</option>
//             <option value={8}>8</option>
//             <option value={16}>16</option>
//             <option value={24}>24</option>
//           </select>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterShowMore;
