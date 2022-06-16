module.exports = {
  PORT: process.env.PORT || 3002,
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cafe_db",
  SECRET_JWT:
    process.env.SECRET_JWT ||
    "1d8c862c4f39cba526730e401fc33377270a2e4a2bc62fb457c20e4de4c04147",
};
