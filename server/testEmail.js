import dotenv from "dotenv";
dotenv.config();
import { sendEmail } from "./utils/sendEmail.js"; // adjust path

sendEmail({
  email: "your-other-email@gmail.com", // test recipient
  subject: "Test Email",
  message: "<h1>Hello!</h1><p>This is a test email from Node.js</p>"
})
.then(() => console.log("Test email sent!"))
.catch(err => console.log("Email failed:", err));