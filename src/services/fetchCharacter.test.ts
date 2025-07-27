import fetchCharacter from './fetchCharecter';
import type { Character } from '../types';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('fetchCharacter', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    type: '',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Citadel of Ricks' },
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns character data when fetch succeeds', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
      status: 200,
      headers: new Headers(),
      redirected: false,
      statusText: '',
      type: 'default',
      url: '',
      clone: function (): Response {
        throw new Error('Function not implemented.');
      },
      body: null,
      bodyUsed: false,
      arrayBuffer: function (): Promise<ArrayBuffer> {
        throw new Error('Function not implemented.');
      },
      blob: function (): Promise<Blob> {
        throw new Error('Function not implemented.');
      },
      bytes: function (): Promise<Uint8Array> {
        throw new Error('Function not implemented.');
      },
      formData: function (): Promise<FormData> {
        throw new Error('Function not implemented.');
      },
      text: function (): Promise<string> {
        throw new Error('Function not implemented.');
      },
    });

    const result = await fetchCharacter(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
    expect(result).toEqual(mockCharacter);
  });

  it('throws an error when fetch fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        results: [mockCharacter],
        info: { pages: 1 },
      }),
      status: 404,
      headers: new Headers(),
      redirected: false,
      statusText: '',
      type: 'default',
      url: '',
      clone: function (): Response {
        throw new Error('Function not implemented.');
      },
      body: null,
      bodyUsed: false,
      arrayBuffer: function (): Promise<ArrayBuffer> {
        throw new Error('Function not implemented.');
      },
      blob: function (): Promise<Blob> {
        throw new Error('Function not implemented.');
      },
      bytes: function (): Promise<Uint8Array> {
        throw new Error('Function not implemented.');
      },
      formData: function (): Promise<FormData> {
        throw new Error('Function not implemented.');
      },
      text: function (): Promise<string> {
        throw new Error('Function not implemented.');
      },
    });

    await expect(fetchCharacter(1)).rejects.toThrow(
      'Failed to fetch a character'
    );
  });
});
