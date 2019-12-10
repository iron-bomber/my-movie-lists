const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showSchema = new Schema(
    {
        epsSeen: Number,
        rating: Number,
        review: String,
        show: {type: Schema.Types.ObjectId, ref: "Show"},
        user: {type: Schema.Types.ObjectId, ref: "User"}
    }
);

const Show = mongoose.model("Show", showSchema)

module.exports = Show