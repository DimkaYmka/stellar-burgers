import { FC, useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { selectIngredients } from '../../services/slices/ingredients';
import { RootState } from '../../services/store';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector((state: RootState) =>
    selectIngredients(state)
  );

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const { ref: bunsRef, inView: inViewBuns } = useInView({ threshold: 0 });
  const { ref: mainsRef, inView: inViewMains } = useInView({ threshold: 0 });
  const { ref: saucesRef, inView: inViewSauces } = useInView({ threshold: 0 });

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    }
    if (inViewMains) {
      setCurrentTab('main');
    }
    if (inViewSauces) {
      setCurrentTab('sauce');
    }
  }, [inViewBuns, inViewMains, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      onTabClick={onTabClick}
    />
  );
};
