const express = require("express");
const session = require("express-session");
const path = require("path");
// Requiring passport as we've configured it
const passport = require("./config/passport");

const PORT = process.env.PORT || 8080;
const db = require("./models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);
require("./routes/review-routes")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/dashboard", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/dashboard.html"));
  });

app.get("/search", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/search.html"));
  });

app.get("/reviews", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/reviews.html"));
    });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

