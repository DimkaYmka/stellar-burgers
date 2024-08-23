// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TOrder } from '@utils-types';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getFeedsApi, getOrdersApi } from '@api';

// interface IFeedsReponse {
//   orders: TOrder[];
//   total: number;
//   totalToday: number;
// }

// interface IFeedState {
//   orders: TOrder[];
//   isLoading: boolean;
//   response: IFeedsReponse;
// }

// const initialState: IFeedState = {
//   orders: [],
//   isLoading: false,
//   response: {
//     total: 0,
//     totalToday: 0,
//     orders: []
//   }
// };

// export const fetchFeeds = createAsyncThunk('feed/fetch', async () => {
//   const response = await getFeedsApi();
//   return response;
// });

// export const fetchUserOrders = createAsyncThunk('feed/fetchUser', async () => {
//   const response = await getOrdersApi();
//   return response;
// });

// const feedSlice = createSlice({
//   name: 'feed',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFeeds.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchFeeds.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orders = action.payload.orders;
//         state.response = action.payload;
//       })
//       .addCase(fetchFeeds.rejected, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(fetchUserOrders.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchUserOrders.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchUserOrders.rejected, (state) => {
//         state.isLoading = false;
//       });
//   },
//   selectors: {
//     getOrders: (state) => state.orders,
//     getTodayOrders: (state) => state,
//     getIsOrdersLoading: (state) => state.isLoading
//   }
// });

// export const { getOrders, getTodayOrders, getIsOrdersLoading } =
//   feedSlice.selectors;

// export default feedSlice.reducer;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrdersApi } from '@api';
import { RootState } from '../../services/store'; // Обратите внимание на правильный путь

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

// Асинхронные экшены
export const fetchFeeds = createAsyncThunk('feed/fetch', async () => {
  const response = await getFeedsApi();
  return response;
});

export const fetchUserOrders = createAsyncThunk('feed/fetchUser', async () => {
  const response = await getOrdersApi();
  return response; // Возвращайте массив заказов напрямую
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
          state.orders = action.payload; // Массив заказов присваивается напрямую
        }
      )
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

// Селекторы
export const selectOrders = (state: RootState) => state.feed.orders;
export const selectTodayOrders = (state: RootState) =>
  state.feed.response.totalToday;
export const selectIsLoading = (state: RootState) => state.feed.isLoading;

export default feedSlice.reducer;
