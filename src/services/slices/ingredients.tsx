// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { TIngredient } from '@utils-types';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getIngredientsApi } from '@api';

// interface IIngredientsState {
//   ingredients: TIngredient[];
//   loading: boolean;
// }

// const initialState: IIngredientsState = {
//   ingredients: [],
//   loading: false
// };

// export const fetchIngredients = createAsyncThunk(
//   'ingredients/fetch',
//   async () => {
//     const response = await getIngredientsApi();
//     return response;
//   }
// );

// const ingredientsSlice = createSlice({
//   name: 'ingredients',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchIngredients.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchIngredients.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ingredients = action.payload;
//       })
//       .addCase(fetchIngredients.rejected, (state, action) => {
//         state.loading = false;
//       });
//   },
//   selectors: {
//     getIngredients: (state) => state.ingredients,
//     getIsIngredientsLoading: (state) => state.loading
//   }
// });

// export const { getIngredients, getIsIngredientsLoading } =
//   ingredientsSlice.selectors;

// export default ingredientsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

// Интерфейс для состояния ингредиентов
interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

// Начальное состояние среза
const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false
};

// Асинхронный экшен для загрузки ингредиентов
export const loadIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/load',
  async () => {
    const data = await getIngredientsApi();
    return data; // Предполагаем, что API возвращает массив TIngredient
  }
);

// Создание среза состояния ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients', // Измените имя среза на 'ingredients'
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(loadIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

// Экспортируем селекторы
export const selectIngredients = (state: { ingredients: IngredientsState }) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: {
  ingredients: IngredientsState;
}) => state.ingredients.isLoading;

export default ingredientsSlice.reducer;
