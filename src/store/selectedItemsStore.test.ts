import { beforeEach, describe, expect, it } from 'vitest';
import { selectedItemsStore } from './selectedItemsStore';

beforeEach(() => {
  selectedItemsStore.getState().clearItems();
});

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('selectedItemsStore', () => {
  it('initially has empty selectedItems', () => {
    const state = selectedItemsStore.getState();
    expect(state.selectedItems).toEqual({});
  });

  it('adds a character to selection items', () => {
    const mockCharacterId = mockCharacter.id;
    selectedItemsStore.getState().toggleItem(mockCharacter);
    const state = selectedItemsStore.getState();
    expect(state.selectedItems[mockCharacterId]).toEqual(mockCharacter);
  });

  it('removes a character from selectedItems is alredy exists', () => {
    const state = selectedItemsStore.getState();
    const mockCharacterId = mockCharacter.id;
    state.toggleItem(mockCharacter);
    state.toggleItem(mockCharacter);
    expect(state.selectedItems[mockCharacterId]).toBeUndefined();
  });

  it('clears all elected items', () => {
    const state = selectedItemsStore.getState();
    state.clearItems();
    expect(state.selectedItems).toEqual({});
  });
});
