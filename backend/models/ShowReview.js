const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowReviewSchema = new Schema(
    {
        rating: Number,
        review: String,
        show: {type: Schema.Types.ObjectId, ref: "Show"},
        user: {type: Schema.Types.ObjectId, ref: "User"}
    }
);

const ShowReview = mongoose.model("ShowReview", ShowReviewSchema)

module.exports = ShowReview