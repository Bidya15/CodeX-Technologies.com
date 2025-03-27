import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Job data for search (matching Jobs page)
  const searchData = [
    { title: "Frontend Developer", category: "job", path: "/jobs" },
    { title: "Backend Developer", category: "job", path: "/jobs" },
    { title: "Full Stack Developer", category: "job", path: "/jobs" },
    { title: "Mobile App Developer", category: "job", path: "/jobs" },
    { title: "UI/UX Designer", category: "job", path: "/jobs" },
    { title: "Web Development", category: "service", path: "/services" },
    { title: "App Development", category: "service", path: "/services" },
    { title: "UI/UX Design", category: "service", path: "/services" },
    { title: "Project 1", category: "portfolio", path: "/portfolio" },
    { title: "Project 2", category: "portfolio", path: "/portfolio" },
    { title: "About Us", category: "about", path: "/about" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const result = searchData.find((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (result) {
      if (result.category === "job") {
        navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(result.path);
      }
      setSearchQuery("");
      setIsOpen(false);
      window.scrollTo(0, 0); // Scroll to top after search navigation
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const filteredResults = searchQuery
    ? searchData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Animation variants for search results
  const resultVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>CodeX-Technologies</h1>
      <motion.form
        className={styles.searchForm}
        onSubmit={handleSearchSubmit}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <motion.button
          type="submit"
          className={styles.searchButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🔍
        </motion.button>
      </motion.form>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span className={isOpen ? styles.barOpen : styles.bar}></span>
        <span className={isOpen ? styles.barOpen : styles.bar}></span>
        <span className={isOpen ? styles.barOpen : styles.bar}></span>
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ""}`}>
        <li>
          <NavLink to="/" className={styles.link} onClick={handleLinkClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            className={styles.link}
            onClick={handleLinkClick}
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/portfolio"
            className={styles.link}
            onClick={handleLinkClick}
          >
            Portfolio
          </NavLink>
        </li>
        <li>
          <NavLink to="/jobs" className={styles.link} onClick={handleLinkClick}>
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={styles.link}
            onClick={handleLinkClick}
          >
            About
          </NavLink>
        </li>
      </ul>
      {searchQuery && (
        <motion.div
          className={styles.searchResults}
          initial="hidden"
          animate="visible"
          variants={resultVariants}
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <motion.div
                key={index}
                className={styles.searchItem}
                onClick={() => {
                  if (item.category === "job") {
                    navigate(`/jobs?search=${encodeURIComponent(item.title)}`);
                  } else {
                    navigate(item.path);
                  }
                  setSearchQuery("");
                  setIsOpen(false);
                  window.scrollTo(0, 0); // Scroll to top after search result click
                }}
                whileHover={{ backgroundColor: "#f0f0f0" }}
              >
                <span>{item.title}</span> <small>({item.category})</small>
              </motion.div>
            ))
          ) : (
            <div className={styles.noResults}>No results found</div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
