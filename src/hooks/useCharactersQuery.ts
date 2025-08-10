import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchData } from '../services/fetchData';

export function useCharactersQuery(query: string, currentPage: number) {
  return useQuery({
    queryKey: ['characters', query, currentPage],
    queryFn: () => fetchData(query, currentPage),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}
