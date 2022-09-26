const express = require("express");
const router = express.Router();

const { signin, checkToken } = require("../controllers/auth");
const { getUserById, addUser } = require("../controllers/user");

// creating a user
router.post("/", addUser);

// login of user
router.post("/signin", signin);

// get a user's data
router.get("/user/", checkToken, getUserById);

module.exports = router;