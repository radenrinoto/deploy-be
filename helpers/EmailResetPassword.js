const EmailResetPassword = (user, token) => {
  return (
    "<!DOCTYPE html>" +
    "<html><head><title>Reset Passowrd</title>" +
    "</head><body><div>" +
    `<p>Hi ${user?.fullName},</p>` +
    "<p>You recently requested to reset the password for your account. Click the link below to continue. This link is valid for the next 10 minutes. If you did not request a password reset, please ignore this email or reply to let us know.</p>" +
    `<a style="background-color: #e89325; color: #ffffff; padding: 10px 20px; text-decoration: none; cursor: pointer; font-weight:600" href='${process.env.BASE_URL_CLIENT}/reset-password/${token}'>Reset Password</a>` +
    "</div></body></html>"
  );
};

module.exports = EmailResetPassword;
