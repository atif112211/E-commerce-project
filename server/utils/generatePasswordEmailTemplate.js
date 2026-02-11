export const generateEmailTemplate = (resetUrl) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #000; color: #fff;">

    <h2 style="color: #fff; text-align: center;">Password Reset Request</h2>

    <p style="font-size: 16px; color: #ccc;">Dear User,</p>

    <p style="font-size: 16px; color: #ccc;">
      We have received a request to reset the password for your account.
      To proceed with the password reset, please click the button below:
    </p>

    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetUrl}" 
         style="display: inline-block; font-size: 16px; font-weight: bold; 
         color: #000; text-decoration: none; padding: 12px 20px; 
         border: 1px solid #fff; border-radius: 5px; background-color: #fff;">
         Reset Password
      </a>
    </div>

    <p style="font-size: 16px; color: #ccc;">
      If you did not request a password reset, please ignore this email.
      The link above will expire in 10 minutes.
    </p>

    <p style="font-size: 16px; color: #ccc;">
      If the button doesn't work, copy and paste the following link into your browser:
    </p>

    <p style="font-size: 16px; color: #fff; word-wrap: break-word;">
      ${resetUrl}
    </p>

    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
      <p>Thank you,<br/>TZ Leather Team</p>
      <p style="font-size: 12px; color: #444;">
        This is an automatically generated email. Please do not reply.
      </p>
      <p>© 2026 TZ Leather. All rights reserved.</p>
    </footer>

  </div>
  `;
};
