const Tutorial = require("../models/tutorialmodel.js");

// Create and Save a tutorial
exports.create = (req, res) => {
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
  });
  tutorial
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred creating the tutorial ",
      });
    });
};

// list all tutorial from the database.
exports.findAll = (req, res) => {
  Tutorial.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred while getting tutorial.",
      });
    });
};

// Find a tutorial with id
exports.findOne = (req, res) => {
  Tutorial.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "tutorial not found with id " + req.params.id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "tutorial not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error getting tutorial with id " + req.params.id,
      });
    });
};

//search by title
exports.findnew = (req, res) => {
  const title = req.params.title;
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "n" } }
    : {};
  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "404 not found",
      });
    });
};

// Update a tutorial with the id
exports.update = (req, res) => {
  Tutorial.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "tutorial not found with id " + req.params.id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "tutorial not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating tutorial with id " + req.params.id,
      });
    });
};

// Delete a tutorial with id
exports.delete = (req, res) => {
  Tutorial.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "tutorial not found with id " + req.params.id,
        });
      }
      res.send({ message: "tutorial deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "tutorial not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete tutorial with id " + req.params.id,
      });
    });
};
