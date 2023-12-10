import React from "react";

import { useDispatch, useSelector } from "react-redux";

import styles from "../Cart/Cart.module.scss";

import { calcTotalPrice } from "../../utils/common";
import { selectCart, addToCart, removeFromCart } from "../../redux/user/userSlice";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const changeQuantity = (book, quantity) => {
    dispatch(addToCart({ book: { ...book }, quantity }));
  };

  const removeProductFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles["section-title"]}>Ваша корзина</h2>
      {!cart.length ? (
        <div className={styles.empty}>Корзина пуста</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { book, quantity } = item;

              return (
                <div key={book.id} className={styles.item}>
                  <div className={styles.image}>
                    <img src={book.images[0]} alt={book.title} />
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.title}>{book.title}</h3>
                    <h3 className={styles.author}>({book.author})</h3>
                    <div className={styles.category}>{book.category.name}</div>
                  </div>

                  <div className={styles.price}>{book.price} ₴</div>
                  <div className={styles.quantity}>
                    <div className={styles.math} onClick={() => changeQuantity(book, Math.max(1, quantity - 1))}>
                      <FaMinus size={16} />
                    </div>

                    <span>{quantity}</span>

                    <div className={styles.math} onClick={() => changeQuantity(book, Math.min(99, quantity + 1))}>
                      <FaPlus size={16} />
                    </div>
                  </div>

                  <div className={styles.total}>{book.price * quantity} ₴</div>

                  <div
                    className={styles.delete}
                    onClick={() => {
                      removeProductFromCart(book.id);
                    }}
                  >
                    <MdDelete size={26} color="#673d95" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles["total-price"]}>
            ИТОГО: {}
            <span>{calcTotalPrice(cart)} грн.</span>
          </div>

          <button type="submit" className={styles.buy}>
            Оформить заказ
          </button>
        </>
      )}
    </section>
  );
};

export default Cart;
