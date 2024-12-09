import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrdersApi } from '@api';
import { RootState } from '../../services/store';

interface IFeedsResponse {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

interface IFeedState {
  orders: TOrder[];
  isLoading: boolean;
  response: IFeedsResponse;
}

const initialState: IFeedState = {
  orders: [],
  isLoading: false,
  response: {
    total: 0,
    totalToday: 0,
    orders: []
  }
};

export const fetchFeeds = createAsyncThunk('feed/fetch', async () => {
  const response = await getFeedsApi();
  return response;
});

export const fetchUserOrders = createAsyncThunk('feed/fetchUser', async () => {
  const response = await getOrdersApi();
  return response;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<IFeedsResponse>) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.response = action.payload;
        }
      )
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const selectOrders = (state: RootState) => state.feed.orders;
export const selectTodayOrders = (state: RootState) =>
  state.feed.response.totalToday;
export const selectIsLoading = (state: RootState) => state.feed.isLoading;

export default feedSlice.reducer;
