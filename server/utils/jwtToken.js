import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, message, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

res
  .status(statusCode)
  .cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",   // ✅ not "none"
    secure: false,     // ✅ must be false for localhost
  })
  .json({
    success: true,
    user,
    token,
    message,
  });

};
