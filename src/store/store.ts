import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from '../features/formSlice';
import { countriesReducer } from '../features/countriesSlice';

export const store = configureStore({
  reducer: {
    forms: formReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
