'use client';

import { useRouter } from 'next/navigation';
import { Typography, Button } from 'antd';
import { SwitchTheme } from './switchTheme/SwitchTheme';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCartStore } from '@/stores/useCartStore/UseCartStore';
import { BurgerMenu } from '../burgerMenu/BurgerMenu';
import './header.css';
import './responsive.css';

const { Title, Text } = Typography;

export const Header = () => {
  const router = useRouter();
  const { cartProducts } = useCartStore();

  return (
    <header className='header'>
      <div className='header_inner'>
        <BurgerMenu />
        <div className='header_navigation'>
          <Title
            level={5}
            onClick={() => router.push('/')}
            style={{
              margin: '0px 20px 0px 0px',
              fontWeight: 'bold',
              letterSpacing: 1.5,
              cursor: 'pointer',
            }}
          >
            O-Complex
          </Title>
          <Text
            className='header_products'
            style={{ textTransform: 'capitalize', cursor: 'pointer' }}
            onClick={() => router.push('/products')}
          >
            Продукты
          </Text>
        </div>
        <Button icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />} className='header_shopping_cart_button'>
          Корзина {cartProducts.length ? `(${cartProducts.length})` : null}
        </Button>
        <SwitchTheme />
      </div>
    </header>
  );
};
