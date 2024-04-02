const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const meetupsRoutes = require("./routes/meetups");
const questionsRoutes = require("./routes/questions");
// const usersRoutes = require('./routes/users');

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meetups", meetupsRoutes);
app.use("/api/questions", questionsRoutes);
// app.use("/api/users", usersRoutes);
app.use("/api/meetups", meetupsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
