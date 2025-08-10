import type { Response } from '../types';

export async function fetchData(
  query: string,
  currentPage: number
): Promise<Response> {
  console.log('Fetching characters...', { query, currentPage });
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  const url = query
    ? `${baseUrl}/?name=${encodeURIComponent(query)}&page=${currentPage}`
    : `${baseUrl}/?page=${currentPage}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();
  const info = data.info;
  const results = data.results;
  return { results, info };
}
