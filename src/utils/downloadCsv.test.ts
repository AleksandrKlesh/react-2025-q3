import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Character } from '../types';
import downloadCsv from './downloadCsvFile';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
];

let anchor: HTMLAnchorElement;

beforeEach(() => {
  anchor = document.createElement('a');
  vi.spyOn(document, 'createElement').mockReturnValue(anchor);
  vi.spyOn(anchor, 'click').mockImplementation(() => {});

  if (!URL.createObjectURL) {
    URL.createObjectURL = vi.fn();
  }
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('downloadCsv', () => {
  it('generates and triggers a CSV download with correct content', () => {
    downloadCsv(mockCharacters);

    expect(anchor.download).toBe('2_items.csv');
    expect(anchor.href).toBe('blob:mock-url');
    expect(anchor.click).toHaveBeenCalled();
  });

  it('generates correct CSV content', async () => {
    downloadCsv(mockCharacters);

    const expectedCsv =
      'ID,Name,Species,Gender,Image\n' +
      '1,Rick Sanchez,Human,Male,https://rickandmortyapi.com/api/character/avatar/1.jpeg\n' +
      '2,Morty Smith,Human,Male,https://rickandmortyapi.com/api/character/avatar/2.jpeg';

    const blob = new Blob([expectedCsv], { type: 'text/csv' });

    const reader = new FileReader();

    const text = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(blob);
    });

    expect(text).toBe(expectedCsv);
  });
});
