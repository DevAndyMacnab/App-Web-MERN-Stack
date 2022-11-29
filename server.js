
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler= require("./middleware/error")

const crypto = require('crypto');

//connect DB
connectDB();


const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/post",require("./routes/post"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));


// Error Handler

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
