// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/home", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/dashboard", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  app.get("/search", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/search.html"));
  });

  app.get("/reviews", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/reviews.html"));
  });

};
