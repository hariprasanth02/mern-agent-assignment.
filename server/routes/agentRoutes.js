// routes/agentRoutes.js
const express = require("express");
const {
  createAgent,
  getAgents,
  updateAgent,
  deleteAgent,
} = require("../controllers/agentController.js");

const router = express.Router();

router.post("/", createAgent);
router.get("/", getAgents);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);

module.exports = router;
