import styles from "./card.module.css";

function Card({ size = "", children }) {
  return <div className={`${styles.card} ${styles[size]}`}>{children}</div>;
}

export default Card;
