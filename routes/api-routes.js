// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Login
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user)      
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
      .then(function() {
        res.redirect(307, "/");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username
      });
    }
  });

  //review function
  app.post("/api/review", function(req, res) {
    console.log('hello');
    console.log(req.body);

    db.Review.create({
        song: req.body.song,
        artist: req.body.artist,
        album: req.body.album,
        body: req.body.body,
        rating: req.body.rating,
        author: req.body.author.toString()
    })
      .then(function() {
        res.json({ success: true })
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for getting review data to be used client side
  app.get("/api/review", function(req, res) {
    if (!req.review) {
      res.json({});
    } else {
      res.json({
        song: req.review.song,
        artist: req.review.artist,
        album: req.review.album,
        body: req.review.body,
        rating: req.review.rating,
        author: req.review.author
      });
    }
  });
};
