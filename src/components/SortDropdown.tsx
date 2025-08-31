import React from 'react';

interface Props {
  sortBy: 'name' | 'population';
  onSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SortDropdown({ sortBy, onSort }: Props) {
  return (
    <select value={sortBy} onChange={onSort} className="border rounded p-2">
      <option value="name">Sort by Name</option>
      <option value="population">Sort by Population</option>
    </select>
  );
}

export { SortDropdown };
