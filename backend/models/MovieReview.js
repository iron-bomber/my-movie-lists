const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieReviewSchema = new Schema(
    {
        rating: {type: Number, default: null},
        review: {type: String, default: null},
        movie: {type: Schema.Types.ObjectId, ref: "Movie"},
        user: {type: Schema.Types.ObjectId, ref: "User"}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const MovieReview = mongoose.model("MovieReview", MovieReviewSchema)

module.exports = MovieReview