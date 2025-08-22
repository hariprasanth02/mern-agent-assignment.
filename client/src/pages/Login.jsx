import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      nav('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white shadow p-8 rounded w-full max-w-sm">
        <h1 className="text-xl mb-4 font-semibold">Admin Login</h1>

        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

        <button className="w-full bg-gray-900 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}