const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
    {
        epsSeen: Number,
        rating: Number,
        review: String,
        show: {type: Schema.Types.ObjectId, ref: "Show"},
        user: {type: Schema.Types.ObjectId, ref: "User"}
    }
);

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review