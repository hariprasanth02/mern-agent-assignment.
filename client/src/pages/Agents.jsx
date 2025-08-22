import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [msg, setMsg] = useState('');

  const load = async () => {
    const { data } = await api.get('/agents');
    setAgents(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.post('/agents', form);
      setForm({ name: '', email: '', mobile: '', password: '' });
      setMsg('Agent created');
      load();
    } catch (e) {
      setMsg(e.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="p-4 grid md:grid-cols-2 gap-6">
      {/* Form Section */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Add Agent</h2>
        <form onSubmit={submit} className="bg-white p-4 rounded shadow">
          <label className="block text-sm">Name</label>
          <input
            className="border p-2 rounded w-full mb-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="border p-2 rounded w-full mb-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label className="block text-sm">Mobile (+CC)</label>
          <input
            className="border p-2 rounded w-full mb-2"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder="+91XXXXXXXXXX"
            required
          />

          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="border p-2 rounded w-full mb-4"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {msg && <div className="text-sm mb-2 text-green-600">{msg}</div>}

          <button className="bg-gray-900 text-white px-4 py-2 rounded">Create</button>
        </form>
      </div>

      {/* Agents Table Section */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Agents (first 5 used in distribution)</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {agents.slice(0, 5).map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="p-2">{a.name}</td>
                  <td className="p-2">{a.email}</td>
                  <td className="p-2">{a.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}