'use client';

import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Pagination from '../Pagination/Pagination';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Flyout from '../Flyout/Flyout';
import { useCharactersQuery } from '../../hooks/useCharactersQuery';
import { RefreshButton } from '../RefreshButton/RefreshButton';
import { Character, Info } from '../../types';

type AppPageProps = {
  initialData: {
    results: Character[];
    info: Info;
  };
};

function App({ initialData }: AppPageProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page') || 1);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  const { data, isError, isLoading, isFetching, refetch } = useCharactersQuery(
    searchQuery,
    currentPage
  );

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 dark:text-white">
      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
      <RefreshButton onRefresh={refetch} />
      <Results
        loading={isLoading || isFetching}
        error={isError ? 'Error loading data' : null}
        data={(initialData.results && data?.results) || []}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={(initialData.info.pages && data?.info.pages) || 0}
      />
      <Flyout />
    </div>
  );
}

export default App;
