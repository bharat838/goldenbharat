// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail", // dev ke liye; production me SendGrid/SES use karo
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Gmail app password (agar 2FA enabled ho)
//   },
// });

// async function sendOtpEmail(to, code, purpose) {
//   const subject = purpose === "verify-email" ? "Verify your email — OTP" : "Password reset OTP";
//   const text = `Your OTP for ${purpose === "verify-email" ? "email verification" : "password reset"} is: ${code}\nThis OTP will expire in 10 minutes.`;
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   });
// }

// module.exports = { sendOtpEmail };
