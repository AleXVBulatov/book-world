import React from "react";

import styles from "./Rating.module.scss";

const Rating = (props) => {
  const { rating, starSize, fontSize } = props;

  const getRatingLength = (rating) => {
    return Number(rating) / 0.05;
  };

  return (
    <form className={styles.rating} style={{ fontSize: starSize }}>
      <div className={styles.body}>
        <div className={styles.active} style={{ width: `${getRatingLength(rating)}%` }}></div>
        <div className={styles.items}>
          <input type="radio" className={styles.item} value="1" name="rating" />
          <input type="radio" className={styles.item} value="2" name="rating" />
          <input type="radio" className={styles.item} value="3" name="rating" />
          <input type="radio" className={styles.item} value="4" name="rating" />
          <input type="radio" className={styles.item} value="5" name="rating" />
        </div>
      </div>
      <div className={styles.result} style={{ fontSize: fontSize }}>
        {rating ? rating : 0}
      </div>
    </form>
  );
};

export default Rating;

// import React from "react";

// import styles from "./Rating.module.scss";

// const Rating = () => {
//   return (
//     <div className={styles.rating}>
//       <div className={styles.body}>
//         <div className={styles.items}>
//           <input id="simple-rating__5" type="radio" value="5" className={styles.item} name="rating" />
//           <label htmlFor="simple-rating__5" className={styles.label}></label>
//           <input id="simple-rating__4" type="radio" value="4" className={styles.item} name="rating" />
//           <label htmlFor="simple-rating__4" className={styles.label}></label>
//           <input id="simple-rating__3" type="radio" value="3" className={styles.item} name="rating" />
//           <label htmlFor="simple-rating__3" className={styles.label}></label>
//           <input id="simple-rating__2" type="radio" value="2" className={styles.item} name="rating" />
//           <label htmlFor="simple-rating__2" className={styles.label}></label>
//           <input id="simple-rating__1" type="radio" value="1" className={styles.item} name="rating" />
//           <label htmlFor="simple-rating__1" className={styles.label}></label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Rating;
