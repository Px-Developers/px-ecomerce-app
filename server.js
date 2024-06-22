import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import path from "path";
dotenv.config();

const { PORT = 8080, MONGO_DB_URL } = process.env;
if (!MONGO_DB_URL) {
  console.error("DB_URL must be set.".red);
  process.exit(1);
}

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
//   Email Implemented

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
app.post("/send-email", async (req, res) => {
  const { clientEmail, description } = req.body;
  console.log(
    "data: ",
    clientEmail,
    description,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const mailOptions = {
    from: `"Client" <${clientEmail}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: "New Contact Form Submission",
    text: `Email: ${clientEmail}\n\nMessage: ${description}`,
    html: `<p><strong>Email:</strong> ${clientEmail}</p><p><strong>Message:</strong><br/>${description}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "Failed to send email. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan);
});
