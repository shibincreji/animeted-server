const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Mongo DB connected!"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
  res.json({
    message: "Hello"
  });
});

const userRouter = require("./routes/user");
const reviewRouter = require("./routes/review");

app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at port 5000`)
})