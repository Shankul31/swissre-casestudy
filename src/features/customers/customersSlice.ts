import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APP_COPY, type Customer } from '../../constants/app.constants';
import { getCustomers } from '../../services/customer.service';
import type { RootState } from '../../store/store';

type CustomerLoadStatus = 'failed' | 'idle' | 'loading' | 'succeeded';

interface CustomersState {
  error: string | null;
  items: Customer[];
  status: CustomerLoadStatus;
}

const initialState: CustomersState = {
  error: null,
  items: [],
  status: 'idle',
};

export const fetchCustomers = createAsyncThunk<
  Customer[],
  void,
  { state: RootState }
>('customers/fetchCustomers', getCustomers, {
  condition: (_, { getState }) => getState().customers.status === 'idle',
});

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.error = APP_COPY.serverErrorMessage;
        state.status = 'failed';
      });
  },
});

export const selectCustomers = (state: RootState) => state.customers.items;
export const selectCustomersError = (state: RootState) => state.customers.error;
export const selectCustomersStatus = (state: RootState) => state.customers.status;

export default customersSlice.reducer;
