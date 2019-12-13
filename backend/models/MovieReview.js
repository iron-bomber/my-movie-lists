const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieReviewSchema = new Schema(
    {
        rating: {type: Number, default: null},
        review: {type: String, default: null},
        movie: {type: Schema.Types.ObjectId, ref: "Movie"},
        user: {type: Schema.Types.ObjectId, ref: "User"},
        dateAdded: {type: Date, default: Date()}
    }
);

const MovieReview = mongoose.model("MovieReview", MovieReviewSchema)

module.exports = MovieReview