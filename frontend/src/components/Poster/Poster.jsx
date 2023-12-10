// вариант 1:
import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

import "swiper/css";
import { posterSwiperStyles } from "./posterSwiperStyles";
import styles from "./Poster.module.scss";

import images from "./poster-images";

register();

const Poster = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      slidesPerView: 2,
      navigation: "true",
      pagination: {
        clickable: "true",
      },
      // loop: true,
      autoplay: {
        delay: 3000,
      },
      scrollbar: "true",
      injectStyles: [posterSwiperStyles],
    };
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <section className={styles.poster}>
      <swiper-container class={styles.swiper} ref={swiperRef} init="false">
        {images.map((image, index) => {
          return (
            <swiper-slide key={index} class={styles.image}>
              <img src={image.url} alt={image.name} />
            </swiper-slide>
          );
        })}
      </swiper-container>
    </section>
  );
};

export default Poster;

// вариант 2:
// import React from "react";
// import { register } from "swiper/element/bundle";

// import "swiper/css";

// import styles from "./Poster.module.scss";

// import img_1 from "../../images/Poster/image_1.jpg";
// import img_2 from "../../images/Poster/image_2.jpg";
// import img_3 from "../../images/Poster/image_3.jpg";

// const images = [
//   { url: img_1, name: "Books 1" },
//   { url: img_2, name: "Books 2" },
//   { url: img_3, name: "Books 3" },
// ];

// const Poster = () => {
//   register();

//   return (
//     <section className={styles.poster}>
//       <swiper-container
//         class={styles.swiper}
//         navigation="true"
//         pagination="true"
//         pagination-clickable="true"
//         // loop="true"
//         autoplay-delay={3000}
//         // scrollbar="true"
//         // pagination-type="fraction"
//       >
//         {images.map((image, index) => {
//           return (
//             <swiper-slide key={index} class={styles.image}>
//               <img src={image.url} alt={image.name} />
//             </swiper-slide>
//           );
//         })}
//       </swiper-container>
//     </section>
//   );
// };

// export default Poster;
