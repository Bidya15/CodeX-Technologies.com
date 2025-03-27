const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const {
    serviceType,
    projectType,
    features,
    budget,
    timeline,
    additionalDetails,
  } = body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "bidyasingrongpi90@gmail.com", // Replace with your email
    subject: `New Project Request: ${serviceType}`,
    text: `
      Service Type: ${serviceType}
      Project Type: ${projectType}
      Desired Features: ${features}
      Budget Range: ${budget || "Not specified"}
      Preferred Timeline: ${timeline || "Not specified"}
      Additional Details: ${additionalDetails || "None"}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Request submitted successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error submitting request" }),
    };
  }
};
