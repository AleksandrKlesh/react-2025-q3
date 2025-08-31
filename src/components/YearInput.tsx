import React from 'react';

interface Props {
  year: number;
  onYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const YearInput: React.FC<Props> = ({ year, onYearChange }) => (
  <input
    type="number"
    value={year}
    onChange={onYearChange}
    className="border rounded p-2 w-28"
  />
);

const yearInputMemo = React.memo(YearInput);

export { yearInputMemo as YearInput };
