 import express from 'express';
 import cors from 'cors';
 import morgan from 'morgan';
 import dotenv from 'dotenv';
 import { connectDB } from './config/db.js';
 import authRoutes from './routes/authRoutes.js';
 import agentRoutes from './routes/agentRoutes.js';
 import uploadRoutes from './routes/uploadRoutes.js';
 import { notFound, errorHandler } from './middleware/errorHandler.js';
 import User from './models/User.js';
 dotenv.config();
 const app = express();
 app.use(notFound);
 app.use(errorHandler);
 app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
 app.use(express.json());
 app.use(morgan('dev'));
 app.get('/', (req, res) => res.send('API running'));
 app.use('/api/auth', authRoutes);
 app.use('/api/agents', agentRoutes);
 app.use('/api/upload', uploadRoutes);
 const start = async () => {
 await connectDB(process.env.MONGO_URI);
 
 const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
 if (adminEmail) {
 const exists = await User.findOne({ email: adminEmail });
 
if (!exists) {
 await User.create({ email: adminEmail, password:
 process.env.ADMIN_PASSWORD || 'Admin@123' });
 console.log('Seeded default admin:', adminEmail);
 }
 }
 const port = process.env.PORT || 5000;
 app.listen(port, () => console.log(`Server listening on ${port}`));
 };
 start();