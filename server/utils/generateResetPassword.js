import crypto from "crypto";


export const generateResetPassword = () => {
const resetToken = crypto.randomBytes(20).toString("hex");
const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
const resetPasswordExpire = Date.now() + 10 * 60 * 1000; //10 minutes
return { resetToken, hashedToken, resetPasswordExpire };
};