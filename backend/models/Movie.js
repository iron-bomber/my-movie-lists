const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema(
    {
        tmdbID: String,
        name: String,
        img: String,
        director: String,
        cast: [String],
        plot: String,
        rating: Number,
        runtime: Number
    }
);

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie