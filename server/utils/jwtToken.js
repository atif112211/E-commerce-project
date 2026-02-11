import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, message, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

res
  .status(statusCode)
  .cookie("token", token, {
    httpOnly: true,
    
  })
  .json({
    success: true,
    user,
    token,
    message,
  });

};
