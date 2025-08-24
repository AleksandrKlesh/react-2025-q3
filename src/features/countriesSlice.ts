import { createSlice } from '@reduxjs/toolkit';

interface CountriesState {
  list: string[];
}

const initialState: CountriesState = {
  list: ['Russia', 'Vietnam', 'United States', 'Canada', 'Germany'],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

const countriesReducer = countriesSlice.reducer;

export { countriesReducer };
