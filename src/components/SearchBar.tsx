import React from 'react';

interface Props {
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<Props> = ({ search, onSearch }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search country..."
      value={search}
      onChange={onSearch}
      className="border rounded p-2"
    />
  );
};

const searchBarMemo = React.memo(SearchBar);

export { searchBarMemo as SearchBar };
