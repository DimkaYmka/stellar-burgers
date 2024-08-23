// import { TConstructorIngredient } from '@utils-types';
// import { TIngredient } from '@utils-types';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface IConstructorState {
//   bun: TConstructorIngredient | null;
//   ingredients: TConstructorIngredient[];
// }

// const initialState: IConstructorState = {
//   bun: null,
//   ingredients: []
// };

// export const constructorSlice = createSlice({
//   name: 'constructor',
//   initialState,
//   reducers: {
//     purgeIngredients: (state) => {
//       state.bun = null;
//       state.ingredients = [];
//     },
//     addToConstructor: {
//       reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
//         if (action.payload.type === 'bun') {
//           if (!state.bun) {
//             state.bun = action.payload;
//           }
//         } else {
//           state.ingredients.push(action.payload);
//         }
//       },
//       prepare: (ingredient: TIngredient) => ({
//         payload: { ...ingredient, id: crypto.randomUUID() }
//       })
//     },
//     deleteFromConstructor: (state, action: PayloadAction<string>) => {
//       const index = state.ingredients.findIndex(
//         (ingredient) => ingredient._id === action.payload
//       );

//       if (index !== -1) {
//         state.ingredients.splice(index, 1);
//       }
//     },
//     moveIngredientDown: (state, action: PayloadAction<number>) => {
//       const index = action.payload;
//       if (index >= 0 && index < state.ingredients.length - 1) {
//         const [movedIngredient] = state.ingredients.splice(index, 1);
//         state.ingredients.splice(index + 1, 0, movedIngredient);
//       }
//     },
//     moveIngredientUp: (state, action: PayloadAction<number>) => {
//       const index = action.payload;
//       if (index > 0 && index < state.ingredients.length) {
//         const [movedIngredient] = state.ingredients.splice(index, 1);
//         state.ingredients.splice(index - 1, 0, movedIngredient);
//       }
//     }
//   }
// });

// export default constructorSlice.reducer;

// export const {
//   moveIngredientDown,
//   moveIngredientUp,
//   addToConstructor,
//   deleteFromConstructor,
//   purgeIngredients
// } = constructorSlice.actions;

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
          if (state.bun === null) {
            state.bun = action.payload;
          }
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
