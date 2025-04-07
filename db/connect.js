// const { Sequelize } = require("sequelize");
// require("dotenv").config();
// const chalk = require("chalk");
// const boxen = require("boxen");
// //==================================================
// const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT || 3306,
//   dialect: "mysql",
//   logging: false, // Set to true to see SQL queries in logs
// });

// //==================================================
// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     // Sync models - { force: true } drops tables; { alter: true } updates structure
//     console.log(chalk.green.bold("✅ MySQL Database connected successfully!"));
//     await sequelize.sync();
//     console.log(chalk.blue.bold("🔄 Database models synced!"));
//     const connectionDetails = `
//   🌎 ${chalk.cyan("Host:")} ${chalk.yellow(process.env.MYSQL_HOST)}
//   🛢️ ${chalk.cyan("Database:")} ${chalk.yellow(process.env.MYSQL_DB)}
//   👷 ${chalk.cyan("User:")} ${chalk.yellow(process.env.MYSQL_USER)}
//   ⚓ ${chalk.cyan("Port:")} ${chalk.yellow(process.env.MYSQL_PORT)}
// `;
//     console.log(
//       boxen(connectionDetails, {
//         padding: 1,
//         borderStyle: "double",
//         borderColor: "cyan",
//       })
//     );

//   } catch (error) {
//     console.error(chalk.red.bold("❌ MySQL Connection Error:"), error.message);
//     process.exit(1);
//   }
// };
// //==================================================
// module.exports = { sequelize, connectDB };

const chalk = require("chalk");
const boxen = require("boxen");

const mongoose = require("mongoose");
require("dotenv").config();
//===========================
mongoose.set('strictQuery', false)
const db = mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {

  // await sequelize.sync();
  console.log(chalk.blue.bold("🔄 Database Synced!"));
  const connectionDetails = `
    🛢️ ${chalk.cyan("Database:")} ${chalk.yellow(process.env.DB)}
    ⚓ ${chalk.cyan("Port:")} ${chalk.yellow(process.env.PORT)}
  `;
  console.log(
    boxen(connectionDetails, {
      padding: 1,
      borderStyle: "double",
      borderColor: "cyan",
    })
  );



})
module.exports = db;