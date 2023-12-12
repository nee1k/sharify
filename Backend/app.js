require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/user");
const Post = require("./models/post");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error: ", err);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});