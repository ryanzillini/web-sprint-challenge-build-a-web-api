// add middlewares here related to actions
const Action = require("./actions-model");
const Project = require("../projects/projects-model");

async function validateActionsId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await Action.get(id);
    if (!action) {
      res.status(404).json({ message: `Action with id: ${id} not found` });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateActionPost(req, res, next) {
  const { notes, description, project_id } = req.body;
  if (!notes || !description || !project_id) {
    res.status(400).json({ message: "Please povide all required fields" });
  } else {
    req.notes = notes;
    req.description = description;
    req.project_id = project_id;
    next();
  }
}

module.exports = {
  validateActionsId,
  validateActionPost,
};
