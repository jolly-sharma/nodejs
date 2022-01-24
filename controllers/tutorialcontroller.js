const Tutorial = require("../models/tutorialmodel.js");
//const User = require("../models/usersmodel.js");

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
exports.getTutorial = (req, res) => {
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

//search by title
exports.findTutorial = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "t" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


exports.getsortTutorial = (req, res) => {
  try {
    const mysort = { updatedAt: -1 };
    const tutorial = Tutorial.find()
      .sort(mysort)
      .then((tutorial) => {
        if (tutorial == null || tutorial === '') {
          res.send('Tutorial Not Found');
        } else {
          res.json({
            tutorial,
          });
        }
      });
  } catch (error) {
    res.status(302).json(error.message);
  }
};
