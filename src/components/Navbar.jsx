import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 p-4 text-white flex justify-between items-center shadow-md">
      <div className="font-bold text-2xl text-blue-400">
        <Link to="/">AnimeBlog</Link>
      </div>
      <ul className="flex space-x-6 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-300 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-blue-300 transition-colors">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded transition-colors">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}