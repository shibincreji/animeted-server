const { compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const User = require("../models/User");

const signin = (req, res) => {
  const body = req.body;
  if (!body.email && !body.password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password.",
    });
  }
  User.findOne({ email: body.email }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server error!, Please try after some time!",
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const result = compareSync(body.password, user.password);

    if (result) {
      const jsonwebtoken = sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        success: true,
        message: "Login successfull!",
        token: jsonwebtoken,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
  });
};

const checkToken = (req, res, next) => {
  let header = req.get("authorization");
  if (header) {
    var token = header.split(" ")[1];
    verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log("ERROR IN CHECK_TOKEN ", err);
        if (err.name == "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Session Expired, Please Login again!",
            isTokenExpired: true,
          });
        }
        res.status(500).json({
          success: false,
          message: err.message,
        });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Access denied! Unauthorized user",
    });
  }
};

module.exports = {
  signin,
  checkToken,
};
