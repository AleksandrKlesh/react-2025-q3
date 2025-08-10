import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  initialValue: string;
}

export default function SearchBar({ onSearch, initialValue }: Props) {
  const [inputValue, setInputValue] = useState(initialValue || '');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    onSearch(trimmed);
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-gray-100 shadow-sm dark:bg-black dark:text-white">
      <input
        className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        value={inputValue}
        onChange={handleInput}
        placeholder="Search characters"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
