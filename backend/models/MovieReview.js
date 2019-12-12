const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieReviewSchema = new Schema(
    {
        rating: Number,
        review: String,
        movie: {type: Schema.Types.ObjectId, ref: "Movie"},
        user: {type: Schema.Types.ObjectId, ref: "User"}
    }
);

const MovieReview = mongoose.model("MovieReview", MovieReviewSchema)

module.exports = MovieReview