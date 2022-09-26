const Review = require("../models/Review");

const getReviewsByAnimeId = (req, res) => {
  console.log(req.params);
  Review.find({ animeId: req.params.animeId })
    .populate("userId", "username")
    .then((reviews) => {
      const avgRating =
        reviews.reduce((prev, cur) => prev + cur.rating, 0) / reviews.length;

      res.status(200).json({
        success: true,
        data: {
          reviews: reviews,
          avg_rating: avgRating,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get Reviews!",
      });
    });
};

const getRatingByAnimeId = (req, res) => {
  Review.find({ animeId: req.params.animeId })
    .then((reviews) => {
      const avgRating =
        reviews.reduce((prev, cur) => prev + cur.rating, 0) / reviews.length;

      res.status(200).json({
        success: true,
        data: avgRating,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Failed to get Rating!",
      });
    });
};

const addReview = (req, res) => {
  const { desc, rating, animeId } = req.body;
  console.log(req.body);
  if (!desc || !rating) {
    return res.status(422).json({
      success: false,
      message: `Please provide Description and Rating!`,
    });
  }

  const review = new Review(req.body);
  review
    .save()
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
        message: "Review Added Successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.name == "ValidationError") {
        res.status(422).json({
          success: false,
          message: Object.values(err.errors)[0].message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to fetch Data, Internal Server Error!",
        });
      }
    });
};

module.exports = {
  getReviewsByAnimeId,
  getRatingByAnimeId,
  addReview,
};
