const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema(
    {
        tmdbID: String,
        name: String,
        img: String,
        plot: String,
        rating: Number,
        runtime: Number,
        release_date: String,
        genres: Array
    }
);

const Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie