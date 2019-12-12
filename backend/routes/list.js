const express       = require('express');
const router        = express.Router();
const User          = require('../models/User');
const Movie         = require('../models/Movie');
const MovieReview   = require('../models/MovieReview');

// router.get('/movie-list', (req, res, next) => {

// })

// router.get('/show-list', (req, res, next) => {

// })

// router.get('/friends-list', (req, res, next) => {

// })

router.post('/add-movie', async (req, res, next) => {
    let newMovie = {
        tmdbID: req.body.movie.id,
        name: req.body.movie.original_title,
        img: req.body.img,
        plot: req.body.movie.overview,
        rating: req.body.movie.vote_average,
        runtime: req.body.movie.runtime,
        release_date: req.body.movie.release_date,
        genres: req.body.movie.genres
    };
    let dbMovie = await Movie.findOne({"tmdbID": newMovie.tmdbID});
    if (!dbMovie) {
        dbMovie = await Movie.create(newMovie).catch( err => res.json(err) )
    }
    let newReview = {
        rating: req.body.rating,
        review: req.body.review,
        movie: dbMovie._id,
        user: req.body.user
    };
    let dbReview = await MovieReview.findOne({$and : [{'user': req.body.user}, {movie: newMovie.tmdbID}]});
    if (!dbReview){
        dbReview = await MovieReview.create(newReview);
    }
    let movieListItem = {
        movie: dbMovie._id,
        review: dbReview._id,
        status: req.body.status
    };
    db.inventory.find( { 'instock.qty': { $lte: 20 } } )
    let userReview = await User.find({$and : [{_id: req.body.user}, {'movieList.movie': movieListItem.movie}]});
    if (!userReview){
        User.findByIdAndUpdate(req.body.user, { $push: { movieList: movieListItem} });
    }   
})

// router.post('/add-show', (req, res, next) => {

// })

// router.post('/add-friend', (req, res, next) => {

// })

module.exports = router;