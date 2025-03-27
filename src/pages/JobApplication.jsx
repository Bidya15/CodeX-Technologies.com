import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./JobApplication.module.css";

const JobApplication = () => {
  const { jobTitle } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    experience: "fresher",
    skills: "",
    resume: null,
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const form = new FormData();
    form.append("jobTitle", decodeURIComponent(jobTitle));
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("contact", formData.contact);
    form.append("experience", formData.experience);
    form.append("skills", formData.skills);
    form.append("resume", formData.resume);
    form.append("coverLetter", formData.coverLetter);

    try {
      const response = await fetch("/api/apply-job", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setSubmitMessage(
          "Application submitted successfully! We’ll review your details."
        );
        setFormData({
          name: "",
          email: "",
          contact: "",
          experience: "fresher",
          skills: "",
          resume: null,
          coverLetter: "",
        });
      } else {
        setSubmitMessage("Error submitting application. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.jobApplication}>
      <h1>Apply for {decodeURIComponent(jobTitle)}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="experience">Experience Level</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          >
            <option value="fresher">Fresher</option>
            <option value="1-2">1-2 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5+">5+ Years</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="skills">Skills (comma-separated)</label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, UI Design"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Tell us why you're a great fit..."
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
      {submitMessage && <p className={styles.submitMessage}>{submitMessage}</p>}
    </div>
  );
};

export default JobApplication;
