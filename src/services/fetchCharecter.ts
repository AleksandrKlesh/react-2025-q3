import type { Character } from '../types';

export default async function fetchCharacter(
  id: number
): Promise<Character | null> {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch a character');
  return response.json();
}
