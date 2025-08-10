import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDetailsQuery } from '../../hooks/useDetailsQuery';

export default function Details() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = Number(searchParams.get('details'));
  const page = searchParams.get('page');

  const { data: character, isLoading: loading } = useDetailsQuery(id);

  if (!id) return null;

  return (
    <div className="p4 border-1 h-full relative dark:bg-black">
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={() => navigate(`/?page=${page}`)}
      >
        Close
      </button>
      {loading ? (
        <div className="text-blue-500">Loading details...</div>
      ) : character ? (
        <div>
          <img src={character.image} alt={character.image} />
          <h2 className="text-lg font-bold">{character.name}</h2>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Type: {character.type}</p>
          <p>Status:{character.status}</p>
          <p>Origin: {character.origin?.name}</p>
          <p>Location: {character.location?.name}</p>
        </div>
      ) : (
        <div>No character found</div>
      )}
    </div>
  );
}
