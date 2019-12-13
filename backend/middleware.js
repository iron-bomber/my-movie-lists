/*
Error Codes
1 - Not logged in
2 - 
*/
function isLoggedIn (req, res, next) {
    if (req.user) {
      return next();
    } else {
      return res.json(null);
    }
}

module.exports = isLoggedIn;