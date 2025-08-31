import React from 'react';

interface Props {
  year: number;
  onYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function YearInput({ year, onYearChange }: Props) {
  return (
    <input
      type="number"
      value={year}
      onChange={onYearChange}
      className="border rounded p-2 w-28"
    />
  );
}

export { YearInput };
