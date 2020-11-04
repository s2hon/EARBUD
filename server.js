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
