import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="flex p-4 gap-4 items-center justify-center">
      <Link to="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      <Link to="/about" className="text-blue-600 hover:underline">
        About
      </Link>
    </nav>
  );
}
