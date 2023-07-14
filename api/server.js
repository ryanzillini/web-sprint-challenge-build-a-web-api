const express = require("express");
const morgan = require("morgan");
const server = express();

server.use(express.json());
server.use(morgan("dev"));

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "something bad happened",
  });
});

module.exports = server;
