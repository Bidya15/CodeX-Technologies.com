import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Add useEffect import
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import JobApplication from "./pages/JobApplication";

// ScrollToTop component to handle scroll behavior on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);

  return null;
};

// RedirectOnRefresh component to redirect to Home on refresh
const RedirectOnRefresh = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/") {
      navigate("/", { replace: true }); // Redirect to Home
    }
  }, []); // Empty dependency array ensures this runs only on initial load (including refresh)

  return null;
};

function App() {
  return (
    <div className="App">
      <ScrollToTop /> {/* Add ScrollToTop component */}
      <RedirectOnRefresh /> {/* Add RedirectOnRefresh component */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/job-application/:jobTitle" element={<JobApplication />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
