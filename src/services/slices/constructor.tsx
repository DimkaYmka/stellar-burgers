import { TConstructorIngredient } from '@utils-types';
import { TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    appendIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients = [...state.ingredients, action.payload];
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = crypto.randomUUID();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const indexToRemove = state.ingredients.findIndex(
        (item) => item._id === action.payload
      );

      if (indexToRemove !== -1) {
        state.ingredients = state.ingredients.filter(
          (_, idx) => idx !== indexToRemove
        );
      }
    },
    shiftIngredientDown: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      if (idx >= 0 && idx < state.ingredients.length - 1) {
        const temp = state.ingredients[idx];
        state.ingredients[idx] = state.ingredients[idx + 1];
        state.ingredients[idx + 1] = temp;
      }
    },
    shiftIngredientUp: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      if (idx > 0 && idx < state.ingredients.length) {
        const temp = state.ingredients[idx];
        state.ingredients[idx] = state.ingredients[idx - 1];
        state.ingredients[idx - 1] = temp;
      }
    }
  }
});

export default burgerConstructorSlice.reducer;

export const {
  clearConstructor,
  appendIngredient,
  removeIngredient,
  shiftIngredientDown,
  shiftIngredientUp
} = burgerConstructorSlice.actions;
