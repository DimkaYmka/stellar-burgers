import React, { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { OrderCardProps } from './type';
import { TIngredient, TOrder } from '@utils-types';
import { selectIngredients } from '../../services/slices/ingredients';
import { OrderCardUI } from '../ui/order-card';
import { RootState } from '../../services/store';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const ingredients = useSelector((state: RootState) =>
    selectIngredients(state)
  );

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce<TIngredient[]>(
      (acc, itemId) => {
        const ingredient = ingredients.find((ing) => ing._id === itemId);
        if (ingredient) acc.push(ingredient);
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);
    const remainingCount = ingredientsInfo.length - ingredientsToShow.length;

    return {
      ingredientsInfo,
      ingredientsToShow,
      remains: remainingCount,
      total,
      date: new Date(order.createdAt),
      _id: order._id,
      status: order.status,
      name: order.name,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      number: order.number,
      ingredients: order.ingredients
    };
  }, [ingredients, order]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
