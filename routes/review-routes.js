var db = require("../models");

module.exports = function(app) {

  // app.get("/api/review", function(req, res) {
  //   var query = {};
  //   if (req.query.author_id) {
  //     query.AuthorId = req.query.author_id;
  //   }
    // 1. Add a join here to include all of the Authors to these review
  //   db.Review.findAll({
  //     where: query,
  //     include: Author
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // Get route for retrieving a single review
  app.get("/api/review/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.Review.findOne({
      where: {
        id: req.params.id
      },
      include: Author
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

  // POST route for saving a new review
  app.post("/api/review", function(req, res) {
    db.Review.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting review
  app.delete("/api/review/:id", function(req, res) {
    db.Review.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating review
  app.put("/api/review", function(req, res) {
    db.Review.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
