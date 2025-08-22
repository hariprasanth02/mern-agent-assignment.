 import { Router } from 'express';
 import { createAgent, listAgents } from '../controllers/agentController.js';
 import { protect, adminOnly } from '../middleware/auth.js';
 const router = Router();
 router.use(protect, adminOnly);
 router.post('/', createAgent);
 router.get('/', listAgents);
 export default router;