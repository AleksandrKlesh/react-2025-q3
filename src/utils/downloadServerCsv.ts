'use server';

import type { Character } from '../types';

export default async function downloadServerCsv(items: Character[]) {
  const headers = ['ID', 'Name', 'Species', 'Gender', 'Image'];
  const rows = items.map((item) => [
    item.id,
    item.name,
    item.species,
    item.gender,
    item.image,
  ]);

  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  return csv;
}
