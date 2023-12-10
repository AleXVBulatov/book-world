import React from "react";

import styles from "./RatingMini.module.scss";

const Rating = (props) => {
  const { rating, starSize, fontSize } = props;

  return (
    <div className={styles.rating} style={{ fontSize: starSize }}>
      <div className={styles.body}></div>
      <div className={styles.result} style={{ fontSize: fontSize }}>
        {rating ? rating : 0}
      </div>
    </div>
  );
};

export default Rating;
