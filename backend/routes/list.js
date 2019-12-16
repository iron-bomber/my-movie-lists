const express       = require('express');
const router        = express.Router();
const User          = require('../models/User');
const Movie         = require('../models/Movie');
const MovieReview   = require('../models/MovieReview');

router.get('/movie-list', async (req, res, next) => {
    console.log(req)
    let theUser = await User.findById(req.body.user);
    for (let movieListItem of theUser.movieList){
        await movieListItem.populate('movie');
        await movieListItem.populate('review');
    }
    console.log(theUser.movieList);
    res.json({movieList: theUser.movieList});
})

// router.get('/show-list', (req, res, next) => {

// })

// router.get('/friends-list', (req, res, next) => {

// })

router.post('/add-movie', async (req, res, next) => {
    // Stores new movie info
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
    // Checks to see if movie is already in db, adds it to db if it isn't
    let dbMovie = await Movie.findOne({"tmdbID": newMovie.tmdbID});
    if (!dbMovie) {
        dbMovie = await Movie.create(newMovie).catch( err => res.json(err) )
    }
    // Stores new review info
    let newReview = {
        rating: req.body.rating,
        review: req.body.review,
        movie: dbMovie._id,
        user: req.body.user
    };
    // Checks to see if user already has a review, adds it to db if it isn't

    let dbReview = await MovieReview.findOne({$and : [{'user': req.body.user}, {movie: dbMovie._id}]});
    if (!dbReview){
        dbReview = await MovieReview.create(newReview);
    }
    let movieListItem = {
        movie: dbMovie._id,
        review: dbReview._id,
        status: req.body.status
    };
    let userReview = await User.findOne({$and : [{_id: req.body.user}, {'movieList.movie': movieListItem.movie}]});
    if (!userReview){
        // let theUser = await User.findById(req.body.user);
        // theUser.movieList.push(movieListItem);
        // User.findByIdAndUpdate(req.body.user, theUser);
        let updatedList = await User.updateOne({'_id': req.body.user}, {
            $push: { movieList: movieListItem }
        });
    }
})

// router.post('/add-show', (req, res, next) => {

// })

// router.post('/add-friend', (req, res, next) => {

// })

module.exports = router;