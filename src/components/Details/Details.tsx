'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useDetailsQuery } from '../../hooks/useDetailsQuery';
import Image from 'next/image';

export default function Details() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(searchParams?.get('details'));
  const page = searchParams?.get('page');

  const { data: character, isLoading: loading } = useDetailsQuery(id);

  if (!id) return null;

  return (
    <div className="p4 border-1 h-full relative dark:bg-black">
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={() => {
          const url = page ? `/?page=${page}` : '/';
          router.push(url);
        }}
      >
        Close
      </button>
      {loading ? (
        <div className="text-blue-500">Loading details...</div>
      ) : character ? (
        <div>
          <Image
            src={character?.image || ''}
            alt={character.name}
            width={300}
            height={300}
          />
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
