import { motion } from "framer-motion";
import styles from "./Card.module.css";

const Card = ({ title, description, image, tech, rating }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push("★");
      else if (i === fullStars && halfStar) stars.push("☆½");
      else stars.push("☆");
    }
    return stars.join(" ");
  };

  return (
    <motion.div className={styles.card}>
      {image && <img src={image} alt={title} className={styles.image} />}
      <h3>{title}</h3>
      <p>{description}</p>
      {tech && <p className={styles.tech}>Tech: {tech}</p>}
      {rating && <p className={styles.rating}>{renderStars(rating)}</p>}
    </motion.div>
  );
};

export default Card;
