 import Agent from '../models/Agent.js';
 export const createAgent = async (req, res) => {
 const { name, email, mobile, password } = req.body;
 if (!name || !email || !mobile || !password) return res.status(400).json({
 message: 'All fields are required' });
 const exists = await Agent.findOne({ email: email.toLowerCase() });
 if (exists) return res.status(409).json({ message: 'Agent already exists' });
 const agent = await Agent.create({ name, email: email.toLowerCase(), mobile,
 password });
 res.status(201).json({ id: agent._id, name: agent.name, email: agent.email,
 mobile: agent.mobile });
 };
 export const listAgents = async (req, res) => {
 const agents = await Agent.find().select('-password');
 res.json(agents);
 };