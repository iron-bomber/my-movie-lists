const express   = require('express');
const router    = express.Router();
const Movie     = require('../models/Movie');
const Show     = require('../models/Show');
const Review     = require('../models/Review');

// router.get('/movie-list', (req, res, next) => {

// })

// router.get('/show-list', (req, res, next) => {

// })

// router.get('/friends-list', (req, res, next) => {

// })

router.post('/add-movie', async (req, res, next) => {
    let theMovie = {
        tmdbID: req.data.movie.id,
        name: req.data.movie.original_title,
        img: req.data.img,
        plot: req.data.movie.overview,
        rating: req.data.movie.vote_average,
        runtime: req.data.movie.runtime,
        release_date: req.data.movie.release_date,
        genres: req.data.movie.genres
    };
    let rating = req.data.rating;
    let review = req.data.review;
    let userId = req.data.user;
    let newMovie = await Movie.findOne({"tmdbID": movie.tmdbID});
    if (!newMovie) {
        newMovie = await Movie.create(theMovie).catch( err => res.json(err) )
    }
    let newReview = {
        rating: req.body.rating,
        review: req.body.review,
        show: ,
        user: {type: Schema.Types.ObjectId, ref: "User"}
    }

})

// router.post('/add-show', (req, res, next) => {

// })

// router.post('/add-friend', (req, res, next) => {

// })

module.exports = router;
