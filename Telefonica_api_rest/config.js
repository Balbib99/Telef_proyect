const DB_HOST = process.env.FRONTEND_URL || "127.0.0.1";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "mongodb";
const PORT = process.env.PORT || "3900";

module.exports = {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  PORT
};