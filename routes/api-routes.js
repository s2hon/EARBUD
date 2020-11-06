// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// const spotify = require("../controllers/search");
const Spotify = require('node-spotify-api')
const login = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
    }
var spotify = new Spotify(login)

module.exports = function (app) {
  // Login
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user)
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({ 
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
      .then(function () {
        res.redirect(307, "/");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our signed in user
  app.get("/api/user_data", function(req, res) {
    db.User.findOne({
      where: {
        email: req.user.email,
        password: req.user.password
      }
    })
    .then(function(dbReviews) {
      console.log(dbReviews);
      res.json(dbReviews);
    })
  });


  //review function
  app.post("/api/review", function(req, res) {
    console.log(req.body);
    console.log('hello');
    db.Review.create({
        song: req.body.song,
        artist: req.body.artist,
        album: req.body.album,
        body: req.body.body,
        rating: req.body.rating,
        author: req.body.author.toString()
    })
    .then(function() {
      res.redirect(307, "/");
    })
    .catch(function(err) {
      console.log(err);
      res.status(401).json(err);
    });
  });

  app.get("/api/review/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.Review.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // Route for getting review data to be used client side
  app.get("/api/review_data", function(req, res) {
    db.Review.findAll({})
    .then(function(dbReviews) {
      console.log(dbReviews);
      res.json(dbReviews);
    })
  });

  app.get("/api/search", function(req, res) {
    let searchTerm = req.query.term;
    let songCollect = [];
          spotify.search({
              type: 'track',
              query: searchTerm,
              limit: 5
          }, function (err, data) {
              // console.log(err + "with search term");
              // console.log(data.tracks + "with search term");
              let song = data.tracks.items;
              // console.log(song);
              song.map(songs => {
                  const searchResults = {
                      artist: songs.album.artists[0].name,
                      song: songs.name,
                      album: songs.album.name
                  }
                  songCollect.push(searchResults);
              })
              console.log(songCollect);
              res.json(songCollect);

          })
      // }
  
  // }
  });


};
