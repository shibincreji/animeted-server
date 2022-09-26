const express = require("express");
const router = express.Router();

const { checkToken } = require("../controllers/auth");
const { getReviewsByAnimeId, addReview, getRatingByAnimeId } = require("../controllers/review");

// creating a review
router.post("/", checkToken, addReview);

// get a anime's reviews
router.get("/anime/:animeId/", checkToken, getReviewsByAnimeId);

// get a anime's rating
router.get("/anime/rating/:animeId/", checkToken, getRatingByAnimeId);

module.exports = router;