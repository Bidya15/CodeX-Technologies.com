import { motion } from "framer-motion";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
  const ongoingProjects = [
    {
      title: "E-Commerce Platform",
      description:
        "A scalable online store with real-time inventory and payment integration.",
      tech: "React, Node.js, Stripe",
      status: "In Progress - 75% Complete",
    },
    {
      title: "Social Media App",
      description:
        "A mobile app for connecting users with live chat and media sharing.",
      tech: "Fluter, Firebase",
      status: "In progress - 10% Complete",
    },
  ];

  const completedProjects = [
    {
      title: "Travel-Guide Website",
      description:
        "A sleek, responsive site for a travel guide website called TravelX, where you can find the best locations that must visit in North-East India.",
      tech: "React, Vite, Css",
      clientFeedback: "Exceptional design and functionality!",
      website: "https://travel-website-ochre-three.vercel.app/",
    },
    {
      title: "Portfolio Website",
      description: "A functional and responsive portfolio for personal use .",
      tech: "React, Vite, Css",
      clientFeedback: "Its look cool!",
      website: "https://bidya15.github.io/Portfolio15/",
    },
    {
      title: "E-Commerce Grocery Website",
      description:
        "A functional and responsive e-commerce website where customer can buy groceries. Its only fronted part of the website , here backend is not implemented.",
      tech: "HTML, JavaScript, Css",
      clientFeedback: "Its look cool!",
      website: "https://bidya15.github.io/E-Commerce.com/",
    },
    {
      title: "Fitness Tracker",
      description: "A cross-platform app to track workouts and nutrition.",
      tech: "React Native, MongoDB",
      clientFeedback: "User-friendly and realiable.",
      website: "https://example.com/fitness-tracker",
    },
    {
      title: "E-Leaning Platform",
      description: "An eduactional platform with video courses and quizzes.",
      tech: "Next.js, MySQL",
      clientFeedback: "Excellence learning process.",
      website: "https://example.com/e-learning-platform",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 212, 185, 0.3" },
  };

  // handle button click to open the wensite in a new tab
  const handleVisiteWebsite = (url) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <div className={styles.portfolio}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Portfolio
      </motion.h1>
      <p className={styles.intro}>
        Explore our diverse range of projects, showcasing our expirtise and
        innovation.
      </p>
      {/* Ongoing Projects */}
      <section className={styles.section}>
        <h2>Ongoing Projects</h2>
        <div className={styles.grid}>
          {ongoingProjects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <div className={styles.card}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className={styles.tech}>Tech: {project.tech}</p>
                <p className={styles.status}>{project.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Completed Projects */}
      <section className={styles.section}>
        <h2>Completed Projects</h2>
        <div className={styles.grid}>
          {completedProjects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <div className={styles.card}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className={styles.tech}>Tech: {project.tech}</p>
                {project.clientFeedback && (
                  <p className={styles.feedback}>"{project.clientFeedback}"</p>
                )}
                {project.website && (
                  <motion.button
                    className={styles.visitButton}
                    onClick={() => handleVisiteWebsite(project.website)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Website
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
