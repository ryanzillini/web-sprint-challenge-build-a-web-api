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

router.post("/", validateProjectPost, (req, res, next) => {
  Project.insert({
    name: req.name,
    description: req.description,
    completed: req.completed,
  })
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.put("/:id", validateProjectId, validateProjectPost, (req, res, next) => {
  Project.update(req.params.id, {
    name: req.name,
    description: req.description,
    completed: req.body.completed,
  })
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const actions = await Project.getProjectActions(req.params.id);
    res.json(actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
