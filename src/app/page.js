"use client";

import { useState } from "react";

import styles from "./page.module.css";
import products from "./products.json";

export default function SpookyStore() {
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setShowCartModal(!showCartModal);
    setShowCheckout(false);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowCheckout(true);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>🎃 Spooky Store</div>
          <ul className={styles["nav-links"]}>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#products">Products</a>
            </li>
            <li>
              <a href="#about">About Halloween</a>
            </li>
          </ul>
          <button className={styles["cart-btn"]} onClick={toggleCart}>
            🛒 Cart <span className={styles["cart-count"]}>{totalItems}</span>
          </button>
        </nav>
      </header>

      <section id="home" className={styles.hero}>
        <h1>👻 Spooky Halloween Store 👻</h1>
        <p>Find the Perfect Costume and Masks for Halloween Night!</p>
      </section>

      <section id="products" className={styles.section}>
        <h2>🎭 Our Products</h2>
        <div className={styles["products-grid"]}>
          {products.map((product) => (
            <div key={product.id} className={styles["product-card"]}>
              <div className={styles["product-img"]}>{product.emoji}</div>
              <div className={styles["product-info"]}>
                <h3>{product.name}</h3>
                <p>
                  {product.category === "costume"
                    ? "Full Costume Set"
                    : "High-Quality Mask"}
                </p>
                <div className={styles["product-price"]}>
                  ${product.price.toFixed(2)}
                </div>
                <button
                  className={styles["add-to-cart"]}
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className={styles["about-section"]}>
        <div className={styles["about-content"]}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "3rem",
              marginBottom: "2rem",
            }}
          >
            🎃 About Halloween
          </h2>

          <h3>What is Halloween?</h3>
          <p>
            Halloween, also known as All Hallows&apos; Eve, is a celebration
            observed in many countries on October 31st, the eve of the Western
            Christian feast of All Hallows&apos; Day. It marks the beginning of
            Allhallowtide, a time dedicated to remembering the dead, including
            saints, martyrs, and all the faithful departed.
          </p>

          <h3>Origins and History</h3>
          <p>
            Halloween has its roots in the ancient Celtic festival of Samhain
            (pronounced &quot;sow-in&quot;). The Celts, who lived 2,000 years
            ago in the area that is now Ireland, the United Kingdom, and
            northern France, celebrated their new year on November 1st. This day
            marked the end of summer and the harvest and the beginning of the
            dark, cold winter, a time often associated with human death.
          </p>

          <p>
            The Celts believed that on the night before the new year, the
            boundary between the worlds of the living and the dead became
            blurred. On the night of October 31st, they celebrated Samhain, when
            it was believed that the ghosts of the dead returned to earth.
          </p>

          <h3>Modern Halloween Traditions</h3>
          <p>
            Today, Halloween has evolved into a day of activities like
            trick-or-treating, carving jack-o&apos;-lanterns, festive
            gatherings, wearing costumes, and eating treats. The tradition of
            dressing in costume dates back to Celtic times when people would
            light bonfires and wear costumes to ward off ghosts.
          </p>

          <p>
            Halloween costumes have become increasingly elaborate and creative
            over the years. From spooky monsters and witches to superheroes and
            pop culture icons, the tradition of wearing masks and costumes
            allows people to transform themselves and embrace the spirit of the
            holiday.
          </p>

          <h3>Halloween Around the World</h3>
          <p>
            While Halloween is most popular in the United States, Canada, and
            Ireland, it has gained popularity in many other countries around the
            world. Each culture adds its own unique twist to the celebration,
            making it a truly global phenomenon that brings communities together
            in celebration of the spooky and supernatural!
          </p>
        </div>
      </section>

      {showCartModal && (
        <div className={styles["cart-modal"]}>
          <div className={styles["cart-content"]}>
            <div className={styles["cart-header"]}>
              <h2>🛒 Shopping Cart</h2>
              <button className={styles["close-cart"]} onClick={toggleCart}>
                ×
              </button>
            </div>

            <div className={styles["cart-items"]}>
              {cart.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#aaa",
                  }}
                >
                  Your cart is empty
                </p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className={styles["cart-item"]}>
                    <div>
                      <strong>
                        {item.emoji} {item.name}
                      </strong>
                      <br />
                      <span style={{ color: "#aaa" }}>
                        Quantity: {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#ff5e00",
                          fontSize: "1.2rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        className={styles["remove-btn"]}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className={styles["cart-total"]}>
              Total: ${totalPrice.toFixed(2)}
            </div>

            <button className={styles["checkout-btn"]} onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            {showCheckout && (
              <div className={styles["checkout-section"]}>
                <h3 style={{ color: "#ff5e00", marginBottom: "1rem" }}>
                  Payment Information
                </h3>
                <div className={styles["pix-info"]}>
                  <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                    Pay with PIX
                  </p>
                  <p>Please use the PIX key below to complete your payment:</p>
                  <div className={styles["pix-key"]}>
                    your-pix-key@email.com
                  </div>
                  <p style={{ marginTop: "1rem", color: "#aaa" }}>
                    After payment, send proof to our WhatsApp!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>
          © 2024 Spooky Store - All Rights Reserved | Have a Spooktacular
          Halloween! 🎃👻
        </p>
      </footer>
    </>
  );
}
