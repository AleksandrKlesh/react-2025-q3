import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchData } from './fetchData';
import type { Character } from '../types';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('fetchData', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns character data on successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [mockCharacter],
        info: { pages: 1 },
      }),
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

    const data = await fetchData('rick', 1);
    expect(data).toEqual({
      results: [mockCharacter],
      info: { pages: 1 },
    });
    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=rick&page=1'
    );
  });

  it('throws error for 404 status', async () => {
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

    await expect(fetchData('unknown', 1)).rejects.toThrow('API error: 404');
  });

  it('throw error for other non-OK statuses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        results: [mockCharacter],
        info: { pages: 1 },
      }),
      status: 500,
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

    await expect(fetchData('fail', 1)).rejects.toThrow('API error: 500');
  });

  it('uses default URL if no query is provided', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [mockCharacter],
        info: { pages: 1 },
      }),
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

    const data = await fetchData('', 1);
    expect(data).toEqual({
      results: [mockCharacter],
      info: { pages: 1 },
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?page=1'
    );
  });
});
