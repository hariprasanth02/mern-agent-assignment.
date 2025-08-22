 import { useState } from 'react';
 import api from '../api/axios';
 
export default function Upload() {
 const [file, setFile] = useState(null);
 const [result, setResult] = useState(null);
 const [error, setError] = useState('');
 const submit = async (e) => {
 e.preventDefault(); setError(''); setResult(null);
 if (!file) { setError('Choose a file'); return; }
 try {
 const formData = new FormData();
 formData.append('file', file);
 const { data } = await api.post('/upload', formData, { headers: {
 'Content-Type': 'multipart/form-data' } });
 setResult(data);
 } catch (e) {
 setError(e.response?.data?.message || 'Upload failed');
 }
 };
 return (
 <div className="p-4">
 <h2 className="text-lg font-semibold mb-3">Upload CSV/XLSX/XLS</h2>
 <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
 <input type="file" accept=".csv,.xlsx,.xls"
 onChange={(e)=>setFile(e.target.files?.[0]||null)} className="mb-3" />
 <button className="bg-gray-900 text-white px-4 py-2 rounded">Upload &
 Distribute</button>
 {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
 </form>
 {result && (
 <div className="space-y-4">
 <div className="p-3 bg-green-50 border border-green-200 
rounded">Batch ID: <b>{result.batchId}</b></div>
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
 {result.distribution.map((group) => (
 <div key={group.agent.id} className="bg-white rounded shadow p-4">
 <h3 className="font-semibold mb-2">{group.agent.name} <span
 className="text-sm text-gray-500">({group.agent.email})</span></h3>
 <ul className="text-sm list-disc ml-5 space-y-1 max-h-64 
overflow-auto">
 {group.items.map((it, idx) => (
 <li key={idx}><b>{it.firstName}</b> — {it.phone} {it.notes
 && (<span className="text-gray-500">({it.notes})</span>)}</li>
 ))}
 </ul>
 </div>

))}
 </div>
 </div>
 )}
 </div>
 );
 }