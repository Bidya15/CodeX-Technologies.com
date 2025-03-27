import { Link, useNavigate } from "react-router-dom"; // Add Link and useNavigate
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate(); // For programmatic navigation

  // Handle newsletter form submission
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    if (email) {
      console.log("Subscribed:", email);
      alert("Thank you for subscribing!");
      e.target.reset();
    }
  };

  // Handle link click to navigate and scroll to top
  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* About Section */}
        <div className={styles.section}>
          <h3>About CondeX-Technologies</h3>
          <p>
            CodeX-Technologies is a leading software development firm dedicated
            to crafting innovative web and mobile solutions that drive success
            for businesses worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/" onClick={() => handleLinkClick("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => handleLinkClick("/services")}>
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                onClick={() => handleLinkClick("/portfolio")}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={() => handleLinkClick("/jobs")}>
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => handleLinkClick("/about")}>
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className={styles.section}>
          <h3>FAQ</h3>
          <ul>
            <li>
              <Link to="/faq" onClick={() => handleLinkClick("/faq")}>
                How do I get started?
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={() => handleLinkClick("/faq")}>
                What is your pricing?
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={() => handleLinkClick("/faq")}>
                How long does a project take?
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.section}>
          <h3>Contact Us</h3>
          <p>
            Email: <a href="mailto:info@codex.com">info@codex.com</a>
          </p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Tech Lane, Innovation City</p>
        </div>

        {/* Newsletter Signup */}
        <div className={styles.section}>
          <h3>Newsletter</h3>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              name="email" // Add name attribute for form access
              placeholder="Your email"
              className={styles.newsletterInput}
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.newsletterButton}
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div>

      {/* Social Media */}
      <div className={styles.socialMedia}>
        <h3>Follow Us</h3>
        <div className={styles.socialIcons}>
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className={styles.icon}
          >
            FB
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className={styles.icon}
          >
            TW
          </motion.a>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className={styles.icon}
          >
            IG
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className={styles.icon}
          >
            LI
          </motion.a>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>© 2025 CodeX-Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
