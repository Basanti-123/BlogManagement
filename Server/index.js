require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;
const indexRouter = require("./routes");

mongoose.connect(process.env.DB).then(() => {
  console.log("Database connected");
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));


app.use("/", indexRouter);

app.use((err, res, next) => {
  err = err ? err.toString() : "Something went wrong";
  res.status(500).json({ msg: err });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
