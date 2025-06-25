'use client';

import { useRef, useState } from 'react';
import { BurgerNavigationList } from './burgerNavigationList/BurgerNavigationList';
import { Button } from 'antd';
import './burgerMenu.css';
import './responsive.css';

import BurgerMenuIcon from '@/assets/svg/burgerMenu-icon.svg';

export const BurgerMenu = () => {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className='burger_menu'>
      <Button
        type='text'
        icon={<BurgerMenuIcon style={{ width: '40px', height: '40px' }} />}
        className='burger_menu_button'
        onClick={() => setShowNavigation((prev) => !prev)}
        ref={buttonRef}
      />
      {showNavigation ? <BurgerNavigationList onClick={() => setShowNavigation(false)} buttonRef={buttonRef} /> : null}
    </div>
  );
};
