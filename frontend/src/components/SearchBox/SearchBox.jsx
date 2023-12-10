import React from "react";
import { Link } from "react-router-dom";

import styles from "./SearchBox.module.scss";

import highlightMatch from "../../utils/highlightMatch.js";

import { useGetProductsQuery } from "../../redux/api/apiSlice.js";

const SearchBox = (props) => {
  const { searchValue, setSearchValue } = props;

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  // console.log(data);

  return isLoading ? (
    <span>Loading</span>
  ) : !data.length ? (
    <div className={styles.result}>По вашему запросу ничего не найдено</div>
  ) : (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {data.map((product) => {
          return (
            <Link
              to={`categories/${product.category.slug}/${product.id}`}
              key={product.id}
              onClick={() => {
                setSearchValue("");
              }}
            >
              <li className={styles.item}>
                <div className={styles.image}>
                  <img src={product.images[0]} alt={product.title} />
                </div>
                <div className={styles.info}>
                  <div className={styles.title}>{highlightMatch(product.title, searchValue)}</div>
                  <div className={styles.author}>{highlightMatch(product.author, searchValue)}</div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBox;
