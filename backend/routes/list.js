const express       = require('express');
const router        = express.Router();
const User          = require('../models/User');
const Movie         = require('../models/Movie');
const MovieReview   = require('../models/MovieReview');
const isLoggedIn    = require('../middleware');

// Returns a user's friends list and pending requests
router.get('/friends-list', isLoggedIn, async (req, res, next) => {
    let theUser = await User.findById(req.user._id).populate('friends').populate('requests');
    let social = {
        friends: [],
        requests: []
    };
    for (let friend of theUser.friends) {
        social.friends.push({
            _id: friend._id,
            firstName: friend.firstName,
            lastName:  friend.lastName,
        })
    }
    for (let request of theUser.requests) {
        social.requests.push({
            _id: request._id,
            firstName: request.firstName,
            lastName:  request.lastName,
        })
    }
    res.json({social: social});
})

router.post('/add-movie', isLoggedIn, async (req, res, next) => {
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