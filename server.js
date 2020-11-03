const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

const PORT = process.env.PORT || 8080;


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
  