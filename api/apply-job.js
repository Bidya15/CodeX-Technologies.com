const formidable = require("formidable");
const fs = require("fs");
const nodemailer = require("nodemailer");

export const config = {
  api: {
    bodyParser: false, // Disable Vercel's default body parser to handle multipart form data
  },
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = "./uploads"; // Temporary directory for file uploads
  form.keepExtensions = true;

  // Ensure the uploads directory exists
  if (!fs.existsSync(form.uploadDir)) {
    fs.mkdirSync(form.uploadDir);
  }

  return new Promise((resolve) => {
    form.parse(event, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ message: "Error uploading file" }),
        });
        return;
      }

      const {
        name,
        email,
        contact,
        experience,
        skills,
        coverLetter,
        jobTitle,
      } = fields;
      const resume = files.resume;

      // Prepare email notification
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "bidyasingrongpi90@gmail.com", // Replace with your email
        subject: `New Job Application: ${jobTitle}`,
        text: `
          Job Title: ${jobTitle}
          Name: ${name}
          Email: ${email}
          Contact: ${contact}
          Experience: ${experience}
          Skills: ${skills}
          Cover Letter: ${coverLetter || "Not provided"}
        `,
        attachments: resume
          ? [
              {
                filename: resume.originalFilename,
                path: resume.filepath,
              },
            ]
          : [],
      };

      try {
        // Send email
        await transporter.sendMail(mailOptions);

        // Clean up: Delete the temporary file
        if (resume) {
          fs.unlinkSync(resume.filepath);
        }

        resolve({
          statusCode: 200,
          body: JSON.stringify({
            message: "Application submitted successfully",
          }),
        });
      } catch (error) {
        console.error("Error sending email:", error);

        // Clean up: Delete the temporary file even if email fails
        if (resume) {
          fs.unlinkSync(resume.filepath);
        }

        resolve({
          statusCode: 500,
          body: JSON.stringify({ message: "Error submitting application" }),
        });
      }
    });
  });
};
