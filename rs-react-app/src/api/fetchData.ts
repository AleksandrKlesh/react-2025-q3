export interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
}

export async function fetchData(query: string): Promise<Character[]> {
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  const url = query
    ? `${baseUrl}/?name=${encodeURIComponent(query)}&page=1`
    : `${baseUrl}/?page=1`;

  const res = await fetch(url);

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();
  return data.results;
}
