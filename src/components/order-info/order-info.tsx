// import { FC, useMemo, useEffect } from 'react';
// import { Preloader } from '../ui/preloader';
// import { OrderInfoUI } from '../ui/order-info';
// import { useParams } from 'react-router-dom';
// import { TIngredient } from '@utils-types';
// import { getOrder, getOrderData } from '../../services/slices/order';
// import { loadIngredients } from '../../services/slices/ingredients';
// import { useSelector, useDispatch } from '../../services/store';

// export const OrderInfo: FC = () => {
//   const dispatch = useDispatch();
//   const { number: orderIdx } = useParams<{ number: string }>();
//   const order = useSelector(getOrder);
//   const ingredients = useSelector(loadIngredients);

//   useEffect(() => {
//     dispatch(getOrderData(parseInt(orderIdx!)));
//   }, [dispatch, orderIdx]);

//   const orderInfo = useMemo(() => {
//     if (!order || !ingredients.length) return null;

//     const date = new Date(order.createdAt);

//     type TIngredientsWithCount = {
//       [key: string]: TIngredient & { count: number };
//     };

//     const ingredientsInfo: TIngredientsWithCount = order.ingredients.reduce(
//       (acc: TIngredientsWithCount, item) => {
//         if (!acc[item]) {
//           const ingredient = ingredients.find((ing) => ing._id === item);
//           if (ingredient) {
//             acc[item] = { ...ingredient, count: 1 };
//           }
//         } else {
//           acc[item].count += 1;
//         }
//         return acc;
//       },
//       {}
//     );

//     const total = order.ingredients.reduce((sum, item) => {
//       const ingredient = ingredients.find((ing) => ing._id === item);
//       return sum + (ingredient ? ingredient.price : 0);
//     }, 0);

//     return {
//       ...order,
//       ingredientsInfo,
//       date,
//       total
//     };
//   }, [order, ingredients]);

//   if (!orderInfo) {
//     return <Preloader />;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };
import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { getOrder, getOrderData } from '../../services/slices/order';
import {
  selectIngredients,
  loadIngredients
} from '../../services/slices/ingredients';
import { useSelector, useDispatch } from '../../services/store';
import { RootState } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number: orderIdx } = useParams<{ number: string }>();
  const order = useSelector(getOrder);
  const ingredients = useSelector((state: RootState) =>
    selectIngredients(state)
  );

  useEffect(() => {
    if (orderIdx) {
      dispatch(getOrderData(parseInt(orderIdx, 10)));
    }
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
  }, [dispatch, orderIdx, ingredients.length]);

  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) return null;

    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo: TIngredientsWithCount = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count += 1;
        }
        return acc;
      },
      {}
    );

    const total = order.ingredients.reduce((sum, item) => {
      const ingredient = ingredients.find((ing) => ing._id === item);
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
