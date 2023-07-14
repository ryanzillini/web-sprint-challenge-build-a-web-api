// add middlewares here related to projects
const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Project.get(id);
    if (!project) {
      res.status(404).json({ message: "Project with not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateProjectPost(req, res, next) {
  const { name, description } = req.body;
  if (!description || !name) {
    res
      .status(400)
      .json({ message: "Please provide name and description of project" });
  } else {
    req.name = name.trim();
    req.description = description.trim();
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProjectPost,
};
