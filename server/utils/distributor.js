export const distributeEqually = (items, agents, batchId) => {

 if (!agents.length) throw new Error('No agents to distribute to');
 const n = agents.length; 
 const result = [];

 items.forEach((item, idx) => {
 const agent = agents[idx % n];
 result.push({ agent: agent._id, firstName: item.firstName, phone:
 item.phone, notes: item.notes, batchId });
 });
 
return result;
 };