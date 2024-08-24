import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false
};

export const loadIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/load',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
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

export const selectIngredients = (state: { ingredients: IngredientsState }) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: {
  ingredients: IngredientsState;
}) => state.ingredients.isLoading;

export default ingredientsSlice.reducer;
