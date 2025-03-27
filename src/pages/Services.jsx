import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Services.module.css";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "We deliver custom web solutions tailored to your business needs. From responsive frontends to robust backends, our team ensures your website is fast, secure, and scalable. Whether it’s an e-commerce platform, a content management system, or a dynamic web app, we leverage the latest technologies to drive your online presence.",
      features: [
        "Responsive Design",
        "API Integration",
        "SEO Optimization",
        "Secure Authentication",
        "Custom CMS Development",
        "E-Commerce Functionality",
        "Performance Optimization",
      ],
      tech: "React, Vite, Node.js, Express, MongoDB",
    },
    {
      title: "App Development",
      description:
        "Our mobile app development services bring your ideas to life on iOS and Android. We specialize in cross-platform solutions that reduce development time without compromising quality. Expect sleek designs, smooth performance, and features like push notifications, offline capabilities, and third-party integrations.",
      features: [
        "Cross-Platform Apps",
        "Native Performance",
        "Custom UI/UX",
        "App Store Deployment",
        "Push Notifications",
        "Offline Mode",
        "In-App Analytics",
      ],
      tech: "Flutter, React Native, Swift, Kotlin",
    },
    {
      title: "UI/UX Design",
      description:
        "We craft user interfaces that are not only beautiful but also intuitive. Our UI/UX design process involves research, wireframing, prototyping, and testing to ensure a seamless user experience. Whether it’s for web, mobile, or desktop, we focus on usability, accessibility, and engagement to elevate your brand.",
      features: [
        "User Research",
        "Wireframes & Prototypes",
        "Interactive Designs",
        "Accessibility Compliance",
        "Branding & Identity",
        "Usability Testing",
        "Motion Design",
      ],
      tech: "Figma, Adobe XD, Sketch",
    },
  ];

  const [formData, setFormData] = useState({
    serviceType: "",
    projectType: "",
    features: "",
    budget: "",
    timeline: "",
    additionalDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/request-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage(
          "Thank you! Your request has been submitted successfully."
        );
        setFormData({
          serviceType: "",
          projectType: "",
          features: "",
          budget: "",
          timeline: "",
          additionalDetails: "",
        });
      } else {
        setSubmitMessage("Error submitting request. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Error submitting request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
    }),
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 212, 185, 0.3)" },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className={styles.services}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h1>
      <p className={styles.intro}>
        Discover how we can transform your digital presence with our expert
        services.
      </p>

      <div className={styles.grid}>
        {services.map((service, index) => (
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
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <h3>Key Features:</h3>
              <ul>
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <p className={styles.tech}>Tech Stack: {service.tech}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.section
        className={styles.requestSection}
        variants={formVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2>Request a Project</h2>
        <p className={styles.requestIntro}>
          Tell us about your project needs, and we’ll get back to you with a
          tailored solution.
        </p>
        <form onSubmit={handleSubmit} className={styles.requestForm}>
          <div className={styles.formGroup}>
            <label htmlFor="serviceType">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="projectType">Project Type</label>
            <input
              type="text"
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              placeholder="e.g., E-commerce website, Social app"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="features">Desired Features</label>
            <textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="e.g., User login, Payment gateway, Dark mode"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="budget">Budget Range</label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., $5,000 - $10,000"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="timeline">Preferred Timeline</label>
            <input
              type="text"
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="e.g., 2 months"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="additionalDetails">Additional Details</label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Anything else we should know?"
            />
          </div>

          <motion.button
            type="submit"
            className={styles.submitButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </motion.button>
        </form>
        {submitMessage && (
          <p className={styles.submitMessage}>{submitMessage}</p>
        )}
      </motion.section>
    </div>
  );
};

export default Services;
