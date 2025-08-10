import { useQuery } from '@tanstack/react-query';
import fetchCharacter from '../services/fetchCharecter';

export function useDetailsQuery(id: number) {
  return useQuery({
    queryKey: ['details', id],
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
