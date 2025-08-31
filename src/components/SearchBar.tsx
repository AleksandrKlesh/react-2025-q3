import React from 'react';

interface Props {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ search, onSearch }: Props) {
  return (
    <input
      type="text"
      placeholder="Search country..."
      value={search}
      onChange={onSearch}
      className="border rounded p-2"
    />
  );
}

export { SearchBar };
