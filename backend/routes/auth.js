const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const isLoggedIn    = require('../middleware');


router.post('/signup', (req, res, next) => {
  
  User.register(req.body, req.body.password)
    .then((user) => { 
        req.login(user, function(err,result){
          res.status(201).json(user)
        })
    })
    .catch((err) => { 
      res.status(500).json({ err })
    });
});

// Checks db to see if email is taken during registration
router.post('/validEmail', (req, res, next) => {
  let email = req.body.email;
    User.findOne({"email": email})
    .then((user) => {
        if (!user) {
            res.json({
                free: true
              });
            return;
        } else {
          res.json({
            free: false
          });
          return;
        }
    })
    .catch(error => {
      res.json({
        error: error
      })
    })
})


//return await service.get('/is-logged-in');
router.get('/is-logged-in', isLoggedIn, async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate('movieList.movie')
    .populate('movieList.review')
  res.json(user);
})


router.post('/login', passport.authenticate('local'), async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate('movieList.movie')
    .populate('movieList.review')
    .populate('friends')
    .populate('requests')
    // .populate('showList.movie')
    // .populate('showList.review')
  res.status(200).json(user);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});

router.get('/profile', isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
