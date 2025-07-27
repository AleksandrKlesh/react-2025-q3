import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-2">About us</h1>
      <h2 className="text-xl font-bold mb-2">
        Developed by Aleksandr Kleshchev
      </h2>
      <p className="mb-4">Passionate junior developer studying at RS-School.</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        RS-School React Course
      </a>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back to homepage
      </Link>
    </div>
  );
}

export default About;
