import Link from 'next/link';

function NotFound() {
  return (
    <div className="min-h-screen p-4 text-center dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-2">Oops! The page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Go back to homepage
      </Link>
    </div>
  );
}

export default NotFound;
