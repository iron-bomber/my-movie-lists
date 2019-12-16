const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowReviewSchema = new Schema(
    {
        rating: {type: Number, default: null},
        review: {type: String, default: null},
        show: {type: Schema.Types.ObjectId, ref: "Show"},
        user: {type: Schema.Types.ObjectId, ref: "User"}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ShowReview = mongoose.model("ShowReview", ShowReviewSchema)

module.exports = ShowReview