import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';
import { selectIngredients } from '../../services/slices/ingredients';
import { RootState } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((state: RootState) =>
    selectIngredients(state)
  );

  const ingredient = useMemo(
    () => ingredients.find((ing) => ing._id === id),
    [ingredients, id]
  );

  if (!ingredient) return null;

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
