'use client';

import { useRouter } from 'next/navigation';
import { Typography, Button } from 'antd';
import { SwitchTheme } from './switchTheme/SwitchTheme';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './header.css';

const { Title } = Typography;

export const Header = () => {
  const router = useRouter();

  return (
    <header className='header'>
      <div className='header_inner'>
        <Title
          level={5}
          onClick={() => router.push('/')}
          style={{
            margin: 0,
            fontWeight: 'bold',
            letterSpacing: 1.5,
            cursor: 'pointer',
          }}
        >
          O-Complex
        </Title>
        <Button icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />} className='header_shopping_cart_button'>
          Shopping Cart
        </Button>
        <SwitchTheme />
      </div>
    </header>
  );
};
