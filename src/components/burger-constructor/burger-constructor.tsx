import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearConstructor } from '../../services/slices/constructor';
import {
  clearOrderModalData,
  makeOrder,
  resetOrder,
  getOrder,
  getOrderRequest
} from '../../services/slices/order';
import { getUser } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.constructorItems);
  const orderRequest = useSelector(getOrderRequest);
  const order = useSelector(getOrder);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!constructorItems || orderRequest) {
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    const bunId = constructorItems.bun!._id;
    const ids = constructorItems.ingredients.map(
      (ingredient: TIngredient) => ingredient._id
    );
    const ingredients = [bunId, ...ids, bunId];

    dispatch(makeOrder(ingredients)).then(() => {
      dispatch(clearConstructor());
    });
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearOrderModalData());
    navigate('/');
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
