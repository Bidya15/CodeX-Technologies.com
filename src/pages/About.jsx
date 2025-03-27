import { motion } from "framer-motion";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>About CondeX-Technologies</h1>
        <p>
          We are a passionate team dedicated to transforming ideas into
          innovative digital solutions.
        </p>
      </motion.section>

      <section className={styles.content}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2>Our Mission</h2>
          <p>
            At CondeX-Technologies, our mission is to empower businesses with
            cutting-edge technology, delivering high-quality web and mobile
            solutions that drive growth and success.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2>Our Values</h2>
          <ul>
            <li>Innovation: Pushing the boundaries of what’s possible.</li>
            <li>Quality: Delivering excellence in every project.</li>
            <li>
              Collaboration: Working closely with clients to achieve their
              vision.
            </li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
