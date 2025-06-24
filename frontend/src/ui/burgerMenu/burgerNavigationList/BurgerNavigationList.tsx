'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import './burgerNavigationList.css';

const navigationList = [
  { id: 0, href: '/', title: 'Главная' },
  { id: 1, href: '/products', title: 'Продукты' },
];

interface Props {
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const BurgerNavigationList = ({ onClick, buttonRef }: Props) => {
  const burgerNavigationListRef = useRef<any | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const closeMenu = () => {
    onClick();
  };

  const onNavigationClick = (href: string) => {
    closeMenu();
    router.push(href);
  };

  useClickOutside(burgerNavigationListRef, closeMenu, buttonRef);
  return (
    <div className='burger_navigation_list_container' ref={burgerNavigationListRef}>
      <ul className='burger_navigation_list'>
        {navigationList.map((item) => {
          const { id, href, title } = item;
          return (
            <li
              key={id}
              className={`burger_navigation_list_item ${pathname === href ? 'active' : ''}`}
              onClick={pathname === href ? undefined : () => onNavigationClick(href)}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
