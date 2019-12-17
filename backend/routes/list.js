const express       = require('express');
const router        = express.Router();
const User          = require('../models/User');
const Movie         = require('../models/Movie');
const MovieReview   = require('../models/MovieReview');
const Show         = require('../models/Show');
const ShowReview   = require('../models/ShowReview');
const isLoggedIn    = require('../middleware');





router.post('/remove-show', isLoggedIn, async (req, res, next) => {
    let theShowObject = await Show.findOne({tmdbID: req.body.showId});
    await User.update({_id: req.user._id}, {$pull: {showList: {show: theShowObject._id} } });
    let deletedReview = await ShowReview.deleteOne({$and : [{'user': req.user._id}, {show: theShowObject._id}]});
    res.json(deletedReview);
})

router.post('/remove-movie', isLoggedIn, async (req, res, next) => {
    let theMovieObject = await Movie.findOne({tmdbID: req.body.movieId});
    await User.update({_id: req.user._id}, {$pull: {movieList: {movie: theMovieObject._id} } });
    let deletedReview = await MovieReview.deleteOne({$and : [{'user': req.user._id}, {movie: theMovieObject._id}]});
    res.json(deletedReview);
})


// Adds a show to your show list
router.post('/add-show', isLoggedIn, async (req, res, next) => {
    // Stores new show info
    let newShow = {
        tmdbID: req.body.show.id,
        name: req.body.show.name,
        img: req.body.img,
        plot: req.body.show.overview,
        number_of_episodes: req.body.show.number_of_episodes,
        number_of_seasons: req.body.show.number_of_seasons,
        first_air_date: req.body.show.first_air_date,
        genres: req.body.show.genres
    };
    // Checks to see if show is already in db, adds it to db if it isn't
    let dbShow = await Show.findOne({"tmdbID": newShow.tmdbID});
    if (!dbShow) {
        dbShow = await Show.create(newShow).catch( err => res.json(err) )
    }
    // Stores new review info
    let newReview = {
        rating: req.body.rating,
        review: req.body.review,
        show: dbShow._id,
        user: req.body.user
    };
    // Checks to see if user already has a review, adds it to db if it isn't

    let dbReview = await ShowReview.findOne({$and : [{'user': req.body.user}, {show: dbShow._id}]});
    if (!dbReview){
        dbReview = await ShowReview.create(newReview);
    }
    let showListItem = {
        show: dbShow._id,
        review: dbReview._id,
        status: req.body.status,
        currentSeason: req.body.season,
        currentEpisode: req.body.episode
    };
    let userReview = await User.findOne({$and : [{_id: req.body.user}, {'showList.show': showListItem.show}]});
    if (!userReview){
        let updatedList = await User.updateOne({'_id': req.body.user}, {
            $push: { showList: showListItem }
        });
        res.json(updatedList);
    }
})

// Adds a rating to a movie on the user's list
router.post('/update-rating', isLoggedIn, async (req, res, next) => {
    let newMovieReview = await MovieReview.findByIdAndUpdate(req.body.id, { rating: req.body.rating }, {new: true});
    return res.json(newMovieReview);
})

router.post('/update-review', isLoggedIn, async (req, res, next) => {
    console.log(req, "65")
    let newMovieReview = await MovieReview.findByIdAndUpdate(req.body.id, { review: req.body.review }, {new: true});
    return res.json(newMovieReview);
})

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

// Adds movie to user's list, creates review, and adds movie to our db
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
        let updatedList = await User.updateOne({'_id': req.body.user}, {
            $push: { movieList: movieListItem }
        });
        res.json(updatedList)
    }
})

router.post('/find-users', async (req, res, next)=>{
    console.log(req.body.email)
    let users = await User.find({$or: [{"email":{$regex:".*req.body.email.*"}}, {"firstName": {$regex: ".*req.body.email.*"}}, {"lastName": {$regex: ".*req.body.email.*"}} ] } );
    console.log('160 ', users);
    let user = await User.findOne({'email': req.body.email})
    res.json(users);
})

router.post('/send-req', isLoggedIn, async (req, res, next)=>{
    let updatedList = await User.updateOne({'_id': req.body.user}, {
        $push: { requests: req.body._id }
    });
    res.json(updatedList)
})

// router.post('/add-show', (req, res, next) => {

// })

// router.post('/add-friend', (req, res, next) => {

// })

module.exports = router;