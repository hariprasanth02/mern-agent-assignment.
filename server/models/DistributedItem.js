import mongoose from 'mongoose';
 const distributedItemSchema = new mongoose.Schema({
 agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
 firstName: { type: String, required: true },
 phone: { type: String, required: true },
 notes: { type: String },
 batchId: { type: String, required: true } 
 }, { timestamps: true });
 export default mongoose.model('DistributedItem', distributedItemSchema);