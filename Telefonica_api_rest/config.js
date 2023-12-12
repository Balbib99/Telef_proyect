// const DB_HOST = process.env.FRONTEND_URL || "127.0.0.1";
// const DB_PORT = process.env.DB_PORT || 27017;
// const DB_DATABASE = process.env.DB_DATABASE_SRV || "mongodb";
// const PORT = process.env.PORT || "3900";
const DB_DATABASE_SRV = "mongodb+srv://balbib99:Balbin0naskaynuri4@telefdb.z8m5wfe.mongodb.net/"
const DB_DATABASE_LOCAL = process.env.DB_DATABASE_SRV || "mongodb://127.0.0.1:27017/telefonica"

module.exports = {
  DB_DATABASE_SRV,
  DB_DATABASE_LOCAL
};