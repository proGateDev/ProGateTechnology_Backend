const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connect"); // Ensure database connection is properly initialized
const routes = require("./routes");
const chalk = require("chalk");
const path = require("path");

//===========================================================
const app = express();

// Enable CORS
app.use(
  cors({
    origin: "*", // Adjust for security in production
  })
);

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/media", express.static(path.join(__dirname, "media")));

// Routes
app.use(routes);
//===========================================================
// Define PORT properly with fallback
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
console.log(chalk.green.bold("✅ Server started successfully!"));

  // console.log(`✅ Server started on PORT: ${PORT}`);
});