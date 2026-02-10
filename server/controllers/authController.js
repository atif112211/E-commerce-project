import ErrorHandler from "../middlewares/errorMiddleware.js";
import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";

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
    [email],
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
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const logout = catchAsyncError(async (req, res, next) => {});
