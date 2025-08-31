import { useState } from 'react';
import type { CountryData } from '../types/types';

interface Props {
  country: { name: string } & CountryData;
  year: number;
  extraColumns: string[];
}

function CountryCard({ country, year, extraColumns }: Props) {
  const [open, setOpen] = useState(false);
  const yearly = country.data.find((d) => d.year === year);

  return (
    <div
      className="bg-white rounded-2xl shadow p-4 cursor-pointer select-none text-center"
      onClick={() => setOpen((prev) => !prev)}
    >
      <h2 className="text-lg font-bold">Country: {country.name}</h2>
      <p>ISO: {country.iso_code ?? 'N/A'}</p>
      <p>Population: {yearly?.population?.toLocaleString() ?? 'N/A'}</p>

      {open && (
        <table className="w-full mt-2 text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-1">Year</th>
              <th className="p-1">Population</th>
              <th className="p-1">CO₂</th>
              <th className="p-1">CO₂ per Capita</th>
              {extraColumns.map((col) => (
                <th key={col} className="p-1">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yearly ? (
              <tr key={yearly.year} className="border-t">
                <td className="p-1">{yearly.year}</td>
                <td className="p-1">
                  {yearly.population?.toLocaleString() ?? 'N/A'}
                </td>
                <td className="p-1">{yearly.co2?.toFixed(2) ?? 'N/A'}</td>
                <td className="p-1">
                  {yearly.co2_per_capita?.toFixed(2) ?? 'N/A'}
                </td>
                {extraColumns.map((col) => (
                  <td key={col} className="p-1">
                    {yearly[col]?.toFixed?.(2) ?? 'N/A'}
                  </td>
                ))}
              </tr>
            ) : (
              <tr>
                <td colSpan={4} className="p-2 text-center text-gray-500">
                  No data for year {year}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export { CountryCard };
