import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Jobs.module.css";

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Job listings
  const jobs = [
    {
      title: "Frontend Developer",
      description:
        "Build responsive and dynamic user interfaces using modern JavaScript frameworks.",
      requirements: "React, TypeScript, CSS, 2+ years experience",
    },
    {
      title: "Backend Developer",
      description:
        "Develop robust server-side applications and APIs with Node.js and databases.",
      requirements: "Node.js, Express, MongoDB, 3+ years experience",
    },
    {
      title: "Full Stack Developer",
      description:
        "Work on both frontend and backend to deliver end-to-end solutions.",
      requirements: "React, Node.js, SQL, 4+ years experience",
    },
    {
      title: "Mobile App Developer",
      description:
        "Create cross-platform mobile apps with a focus on performance and usability.",
      requirements: "Flutter or React Native, 2+ years experience",
    },
    {
      title: "UI/UX Designer",
      description:
        "Design intuitive and visually appealing interfaces for web and mobile.",
      requirements: "Figma, Adobe XD, 1+ years experience",
    },
  ];

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  // Filter jobs based on search query
  const filteredJobs = searchQuery
    ? jobs.filter((job) => job.title.toLowerCase().includes(searchQuery))
    : jobs;

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

  const handleApplyNow = (jobTitle) => {
    navigate(`/job-application/${encodeURIComponent(jobTitle)}`);
  };

  useEffect(() => {
    if (searchQuery && filteredJobs.length > 0) {
      const element = document.getElementById("jobs-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchQuery, filteredJobs]);

  return (
    <div className={styles.jobs} id="jobs-section">
      <h1>Join Our Team</h1>
      {searchQuery && (
        <p className={styles.searchResult}>
          Showing results for: "{decodeURIComponent(searchQuery)}"
        </p>
      )}
      {filteredJobs.length === 0 ? (
        <p className={styles.noJobs}>No jobs found matching your search.</p>
      ) : (
        <div className={styles.grid}>
          {filteredJobs.map((job, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <div className={styles.card}>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p className={styles.requirements}>
                  Requirements: {job.requirements}
                </p>
                <motion.button
                  className={styles.applyButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleApplyNow(job.title)}
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
