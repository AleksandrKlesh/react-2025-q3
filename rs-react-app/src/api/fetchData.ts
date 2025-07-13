export interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
}

export async function fetchData(query: string): Promise<Character[]> {
  const queryString = query ? `?name=${query}` : '';
  const url = `https://rickandmortyapi.com/api/character/${queryString}&page=1`;

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
