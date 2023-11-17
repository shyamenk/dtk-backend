module.exports = {
  appName: "Doctors Time Keeper:v1",
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_DB_URI,
  },
};
