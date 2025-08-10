import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Flyout from '../Flyout/Flyout';
import { useCharactersQuery } from '../../hooks/useCharactersQuery';
import { RefreshButton } from '../RefreshButton/RefreshButton';

function App() {
  const [searchParam] = useSearchParams();
  const page = Number(searchParam.get('page') || 1);
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
        data={data?.results ?? []}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.info.pages ?? 0}
      />
      <Flyout />
    </div>
  );
}

export default App;
