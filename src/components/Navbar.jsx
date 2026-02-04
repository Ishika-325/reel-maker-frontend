// components/Navbar.jsx
import {useAuth} from '../context/authcontext';
export default function Navbar() {
  const { logout } = useAuth();
  function submit() {
    logout();
  }
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-600">
        Reelify
      </h1>

      <button onClick={submit} className="text-red-500 font-medium hover:text-red-600">
        Logout
      </button>
    </nav>
  );
}
