import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import Agent from '../models/Agent.js';
import DistributedItem from '../models/DistributedItem.js';
import { parseCSVBuffer, parseExcelBuffer, normalizeRecords } from '../utils/fileParsers.js';
import { distributeEqually } from '../utils/distributor.js';

const storage = multer.memoryStorage();
const allowed = ['.csv', '.xlsx', '.xls'];

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error('Only csv, xlsx, xls files are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});


export const handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File is required' });
  }

  const ext = path.extname(req.file.originalname).toLowerCase();
  let rows = [];

  try {
    if (ext === '.csv') {
      rows = await parseCSVBuffer(req.file.buffer);
    } else {
      rows = parseExcelBuffer(req.file.buffer);
    }

    const items = normalizeRecords(rows);
    const agents = await Agent.find();

    if (agents.length < 5) {
      return res.status(400).json({ message: 'At least 5 agents are required' });
    }

    const batchId = crypto.randomBytes(8).toString('hex');
    const selectedAgents = agents.slice(0, 5);
    const distributedDocs = distributeEqually(items, selectedAgents, batchId);

    await DistributedItem.insertMany(distributedDocs);

  
    const byAgent = {};
    for (const a of selectedAgents) {
      byAgent[a._id] = {
        agent: { id: a._id, name: a.name, email: a.email },
        items: [],
      };
    }

    for (const d of distributedDocs) {
      byAgent[d.agent].items.push({
        firstName: d.firstName,
        phone: d.phone,
        notes: d.notes,
      });
    }

    res.status(201).json({ batchId, distribution: Object.values(byAgent) });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getBatch = async (req, res) => {
  const { batchId } = req.params;
  const docs = await DistributedItem.find({ batchId }).populate('agent', 'name email');

  const grouped = {};
  for (const d of docs) {
    const key = d.agent._id.toString();
    if (!grouped[key]) {
      grouped[key] = { agent: d.agent, items: [] };
    }
    grouped[key].items.push({
      firstName: d.firstName,
      phone: d.phone,
      notes: d.notes,
    });
  }

  res.json({ batchId, distribution: Object.values(grouped) });
};