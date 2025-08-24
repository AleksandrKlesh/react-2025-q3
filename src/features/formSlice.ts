import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormValues } from '../utils/validation';

interface FormState {
  uncontrolled: FormValues[];
  hookForm: FormValues[];
}

const initialState: FormState = {
  uncontrolled: [],
  hookForm: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    submitUncontrolledForm: (state, action: PayloadAction<FormValues>) => {
      state.uncontrolled.push(action.payload);
    },
    submitHookForm: (state, action: PayloadAction<FormValues>) => {
      state.hookForm.push(action.payload);
    },
  },
});

export const { submitUncontrolledForm, submitHookForm } = formsSlice.actions;
export const formReducer = formsSlice.reducer;
