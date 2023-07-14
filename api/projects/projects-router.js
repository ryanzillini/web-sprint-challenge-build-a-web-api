// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get(req.params.id)
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

module.exports = router;
