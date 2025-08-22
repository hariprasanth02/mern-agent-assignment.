 import { Link, useNavigate } from 'react-router-dom';
 export default function Navbar() {
 const nav = useNavigate();
 const token = localStorage.getItem('token');
 const logout = () => { localStorage.removeItem('token'); nav('/login'); };
 return (
 <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify
between">
 <Link to="/" className="font-semibold">Agent Distributor</Link>
 <div className="flex gap-4">
 {token && <>
 <Link to="/agents" className="hover:underline">Agents</Link>
 <Link to="/upload" className="hover:underline">Upload</Link>
 <button onClick={logout} className="bg-white text-gray-900 px-3 py-1 
rounded">Logout</button>
 </>}
 {!token && <Link to="/login" className="hover:underline">Login</Link>}
 </div>
 </nav>
 );
 }