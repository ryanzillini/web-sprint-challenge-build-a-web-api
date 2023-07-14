// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");

const {
  validateProjectId,
  validateProjectPost,
} = require("./projects-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    if (!projects) {
      res.json([]);
    } else {
      res.json(projects);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateProjectId, (req, res, next) => {
  res.json(req.project);
});

router.post("/", (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Please provide title and description for post" });
  } else {
    Project.insert({ name: name, description: description })
      .then((project) => {
        res.json(project);
      })
      .catch(next);
  }
});

router.put("/:id", validateProjectId, validateProjectPost, (req, res, next) => {
  Project.update(req.params.id, {
    description: req.description,
    name: req.name,
    completed: true,
  }).then((project) => {
    res.json(project);
  });
});

module.exports = router;
