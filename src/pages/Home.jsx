import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../components/Card";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  // navigate to service page
  const handleGetStartedClick = () => {
    navigate("/services");
  };

  // Particle animation variants
  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 212, 185, 0.3)" },
  };

  // Services data
  const services = [
    {
      title: "Web Development",
      description:
        "We craft scalable, responsive websites tailored to your needs, leveraging modern frameworks and tools for seamless performance.",
      tech: "React, Vite, Node.js, Express, MongoDB",
    },
    {
      title: "App Development",
      description:
        "Building cross-platform mobile apps with stunning designs and robust functionality to engage your users effectively.",
      tech: "Flutter, React Native, Swift, Kotlin",
    },
    {
      title: "UI/UX Design",
      description:
        "Designing intuitive, user-friendly interfaces with a focus on aesthetics and usability to enhance user satisfaction.",
      tech: "Figma, Adobe XD, Sketch",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Rishav Bhatt",
      feedback: "Amazing work, delivered on time!",
      rating: 5,
    },
    {
      name: "John Doe",
      feedback: "Their creativity blew us away.",
      rating: 4.5,
    },
    {
      name: "Vinit Sah",
      feedback: "Professional and highly skilled team.",
      rating: 5,
    },
  ];

  return (
    <div className={styles.home}>
      {/* Animated Background */}
      <div className={styles.background}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            variants={particleVariants}
            animate="animate"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Building Your Digital Future</h1>
        <p>Transforming ideas into reality with cutting-edge technology.</p>
        <motion.button
          onClick={handleGetStartedClick}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 15px rgba(0, 212, 185, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Services Section */}
      <section ref={servicesRef} className={styles.services}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Services
        </motion.h2>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <Card
                title={service.title}
                description={service.description}
                tech={service.tech}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          What Clients Say
        </motion.h2>
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <Card
                title={testimonial.name}
                description={testimonial.feedback}
                rating={testimonial.rating}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
