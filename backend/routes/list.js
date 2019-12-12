const express   = require('express');
const router    = express.Router();
const Movie     = require('../models/Movie');
const Show     = require('../models/Show');

// router.get('/movie-list', (req, res, next) => {

// })

// router.get('/show-list', (req, res, next) => {

// })

// router.get('/friends-list', (req, res, next) => {

// })

router.post('/add-movie', async (req, res, next) => {
    console.log(req)
    let movie = {
        tmdbID: req.body.movie.id,
        name: req.body.movie.original_title,
        img: req.body.img,
        plot: req.body.movie.overview,
        rating: req.body.movie.vote_average,
        runtime: req.body.movie.runtime,
        release_date: req.body.movie.release_date,
        genres: req.body.movie.genres
    };
    let rating = req.body.rating;
    let review = req.body.review;
    let userId = req.body.user;
    let newMovie = await Movie.findOne({"tmdbID": movie.tmdbID});
    if (!newMovie) {
        newMovie = await Movie.create(movie).catch( err => res.json(err) )
    }
    console.log(newMovie);
    res.json(newMovie);

})

// router.post('/add-show', (req, res, next) => {

// })

// router.post('/add-friend', (req, res, next) => {

// })

module.exports = router;
