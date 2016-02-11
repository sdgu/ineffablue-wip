var express = require('express');
var router = express.Router();
var passport = require("passport");
var Strategy = require('passport-twitter').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index');
});

// router.get('/login',
//   function(req, res){
//     res.render('login');
//   });

router.get('/login', passport.authenticate('twitter'));

router.get("/logout", function(req, res)
{
	req.logOut();
	res.redirect("/");
})

router.get('/login/return', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/profile', function(req, res)
{
    if (req.isAuthenticated())
    {
    	res.send(req.user);
    }
    else
    {
    	res.send("need to log in");
    }
});


module.exports = router;
