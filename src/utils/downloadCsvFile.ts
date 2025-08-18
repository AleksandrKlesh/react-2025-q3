'use client';

import type { Character } from '../types';
import downloadServerCsv from './downloadServerCsv';

export default async function downloadCsv(items: Character[]) {
  const csv = await downloadServerCsv(items);
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${items.length}_items.csv`;
  link.click();
}
