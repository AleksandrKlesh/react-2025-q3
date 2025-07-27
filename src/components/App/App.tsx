import { fetchData, type Character } from '../../api/fetchData';
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') || ''
  );

  useEffect(() => {
    loadData(searchQuery);
  }, [searchQuery]);

  const loadData = (query: string) => {
    localStorage.setItem('searchQuery', query);

    setIsLoading(true);
    setError(null);

    fetchData(query)
      .then((results) => {
        setData(results);
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
    <div className="min-h-screen bg-gray-50">
      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
      <Results loading={isLoading} error={error} data={data} />
    </div>
  );
}

export default App;
