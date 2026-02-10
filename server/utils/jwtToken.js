import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, message, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // ✅ Fix: use res.status() instead of res.statusCode()
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + process.env.COOKIES_EXPIRE * 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
    })
    .json({
      success: true,
      user,
      token,
      message,
    });
};
