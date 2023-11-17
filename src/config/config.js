module.exports = {
  appName: "Doctors Time Keeper:v1",
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_DB_URI,
  },
  secretKey: process.env.SECRET_KEY,
  algorithm: process.env.ALGORITHM,
  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRE_MINUTES,
};
