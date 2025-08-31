import React, { useState, useMemo, useCallback } from 'react';
import type { Co2Dataset } from '../types/types';
import { CountryCard } from './CountryCard';
import { ColumnModal } from './ColumnModal';
import { SearchBar } from './SearchBar';
import { SortDropdown } from './SortDropdown';
import { YearInput } from './YearInput';

interface Props {
  resource: { read: () => Co2Dataset };
}

const EXTRA_COLUMNS = ['methane', 'oil_co2', 'temperature_change_from_co2'];

function CountryList({ resource }: Props) {
  const data = resource.read();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [year, setYear] = useState<number>(2019);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'population');
  }, []);

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setYear(Number(e.target.value));
    },
    []
  );

  const handleToggleColumn = useCallback((col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  }, []);

  const countries = useMemo(
    () => Object.entries(data).map(([name, c]) => ({ name, ...c })),
    [data]
  );

  const filtered = useMemo(() => {
    let list = countries;

    if (search) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === 'population') {
      list = [...list].sort((a, b) => {
        const popA = a.data.find((d) => d.year === year)?.population ?? 0;
        const popB = b.data.find((d) => d.year === year)?.population ?? 0;
        return popB - popA;
      });
    } else {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [countries, search, sortBy, year]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex gap-4 mb-4">
          <SearchBar search={search} onSearch={handleSearch} />
          <SortDropdown sortBy={sortBy} onSort={handleSort} />
          <YearInput year={year} onYearChange={handleYearChange} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Select Columns
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ColumnModal
          availableColumns={EXTRA_COLUMNS}
          selected={selectedColumns}
          onToggle={handleToggleColumn}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="flex flex-col gap-4">
        {filtered.map((country) => (
          <CountryCard
            key={country.name}
            country={country}
            year={year}
            extraColumns={selectedColumns}
          />
        ))}
      </div>
    </div>
  );
}

const countryListMemo = React.memo(CountryList);

export { countryListMemo as CountryList };
