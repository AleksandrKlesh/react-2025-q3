import type { Character } from '../types';

export default function downloadCsv(items: Character[]) {
  const headers = ['ID', 'Name', 'Species', 'Gender', 'Image'];
  const rows = items.map((item) => [
    item.id,
    item.name,
    item.species,
    item.gender,
    item.image,
  ]);

  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${items.length}_items.csv`;
  link.click();
}
