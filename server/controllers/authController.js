import ErrorHandler from "../middlewares/errorMiddleware.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";
import{generateResetPassword} from "../utils/generateResetPassword.js";
import {generateEmailTemplate} from "../utils/generatePasswordEmailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please Enter All Fields", 400));
  }
  const isAlreadyRegister = await database.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );

  if (isAlreadyRegister.rows.length > 0) {
    return next(new ErrorHandler("User Already Registered", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await database.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [name, email, hashedPassword],
  );

  sendToken(user.rows[0], 201, "User Registered Successfully", res);
  
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter All Fields", 400));
    
  }
  const user = await database.query(
    `SELECT * FROM users WHERE email = $1`,
    [email,]
  );
  if (user.rows.length === 0) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await bcrypt.compare(password, user.rows[0].password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user.rows[0], 200, "User Logged In Successfully", res);
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  res.status(200).cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  }).json({
    success: true,
    message: "User Logged Out Successfully"
  })
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const { frontendUrl } = req.query;

  const userResult = await database.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  if (userResult.rows.length === 0) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  const user = userResult.rows[0];
  const { hashedToken, resetToken, resetPasswordExpire } = generateResetPassword();

  await database.query(
    `UPDATE users SET reset_password_token = $1, reset_password_expire = to_timestamp($2) WHERE email = $3`,
    [hashedToken, resetPasswordExpire / 1000, email]
  );

  const resetUrl = `${frontendUrl}/password/reset/${resetToken}`;
  const message = generateEmailTemplate(resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message
    });

    res.status(200).json({
      success: true,
      message: `Password Reset Email Sent to ${user.email} Successfully`
    });
  } catch (error) {
    await database.query(
      `UPDATE users SET reset_password_token = NULL, reset_password_expire = NULL WHERE email = $1`,
      [email]
    );
    console.log("EMAIL ERROR:", error);
    return next(new ErrorHandler(`Email could not be sent to ${user.email}`, 500));
  }
});
