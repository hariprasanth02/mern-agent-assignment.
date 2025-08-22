const Agent = require("../models/Agent");

// Create new agent
const createAgent = async (req, res) => {
  try {
    const agent = new Agent(req.body);
    const savedAgent = await agent.save();
    res.status(201).json(savedAgent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all agents
const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get agent by ID
const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update agent
const updateAgent = async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(updatedAgent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete agent
const deleteAgent = async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json({ message: "Agent deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
};
