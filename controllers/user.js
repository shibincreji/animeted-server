const User = require("../models/User");
const { genSaltSync, hashSync } = require("bcrypt");

const getUserById = (req, res) => {
  User.findOne({ _id: req.body.userId })
    .populate({
      path: "booking",
      populate: {
        path: "parking",
        populate: {
          path: "parkingPoint",
        },
      },
    })
    .populate({
      path: "savedParkingPoints",
    })
    .then((user) => {
      let tempBooking = user.booking.reverse();
      user.booking = tempBooking;
      user.password = undefined;
      res.status(200).json({
        success: true,
        data: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get User!",
      });
    });
};

const addUser = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(422).json({
      success: false,
      message: `Insufficient data provided!`,
    });
  }

  if (password.length < 6 || password.length > 10) {
    return res.status(422).json({
      success: false,
      message: `Password length should be between 6 and 10!`,
    });
  }

  const salt = genSaltSync(10);
  req.body.password = hashSync(req.body.password, salt);
  const user = new User(req.body);
  user
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
        message: "Signed Up Successfully!",
      });
    })
    .catch((err) => {
      console.log(err)
      if (err.name == "MongoServerError" && err.code == 11000) {
        res.status(409).json({
          success: false,
          message: `This ${Object.keys(err.keyPattern)[0]} is already used!`,
        });
      } else if (err.name == "ValidationError") {
        res.status(422).json({
          success: false,
          message: Object.values(err.errors)[0].message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to Sign Up, Please try again after some time!",
        });
      }
    });
};

module.exports = {
  getUserById,
  addUser,
};
