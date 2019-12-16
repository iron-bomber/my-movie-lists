const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showSchema = new Schema(
    {
        tmdbID: String,
        name: String,
        img: String,
        plot: String,
        number_of_episodes: Number,
        number_of_seasons: Number,
        first_air_date: String,
        genres: Array
    }
);

const Show = mongoose.model("Show", showSchema)

module.exports = Show