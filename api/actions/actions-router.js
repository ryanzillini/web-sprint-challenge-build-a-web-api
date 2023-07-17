// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");

const router = express.Router();

const {
  validateActionsId,
  validateActionPost,
} = require("./actions-middlware");

router.get("/", (req, res, next) => {
  Actions.get(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionsId, (req, res) => {
  res.json(req.action);
});

router.post("/", validateActionPost, (req, res, next) => {
  Actions.insert({
    description: req.body.description,
    notes: req.body.notes,
    project_id: req.body.project_id,
  })
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.put("/:id", validateActionsId, validateActionPost, (req, res, next) => {
  const { completed } = req.body;
  if (!completed) {
    res.status(400).json({ message: "please provide all required fields" });
  }
  Actions.update(req.params.id, {
    description: req.description,
    notes: req.notes,
    project_id: req.project_id,
    completed: req.body.completed,
  })
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.delete("/:id", validateActionsId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.json(req.action);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
