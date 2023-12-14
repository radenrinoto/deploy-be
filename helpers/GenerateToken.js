const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const GenerateToken = (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_TOKEN, { expiresIn: "15m" });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const GenerateResetPasswordToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  return resetToken;
};

module.exports = { GenerateToken, GenerateResetPasswordToken };
