import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import {
  fetchFeeds,
  selectOrders,
  selectIsLoading
} from '../../services/slices/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const getFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
