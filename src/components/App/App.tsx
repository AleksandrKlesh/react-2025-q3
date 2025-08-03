import { fetchData } from '../../services/fetchData';
import type { Character } from '../../types';
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Flyout from '../Flyout/Flyout';

function App() {
  const [searchParam] = useSearchParams();
  const page = Number(searchParam.get('page') || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');

  useEffect(() => {
    loadData(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const loadData = (query: string, currentPage: number) => {
    setIsLoading(true);
    setError(null);

    fetchData(query, currentPage)
      .then((results) => {
        setData(results.results);
        setTotalPages(results.info.pages);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 dark:text-white">
      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
      <Results loading={isLoading} error={error} data={data} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <Flyout />
    </div>
  );
}

export default App;
