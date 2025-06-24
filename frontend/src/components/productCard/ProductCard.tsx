'use client';

import { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { Product } from '@/interfaces/Product';
import { useCartStore } from '@/stores/useCartStore/UseCartStore';
import { InputField } from '../inputField/InputField';
import Image from 'next/image';
import './productCard.css';
import './responsive.css';

const { Title, Paragraph } = Typography;

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { cartProducts, addProduct, removeOneProduct, updateProductQuantity } = useCartStore();
  const { id, image_url, title, description, price } = product;

  const cartItem = cartProducts.find((p) => p.id === id);
  const quantity = cartItem?.quantity ?? 0;
  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^[0-9]+$/.test(value)) {
      setInputValue(value);

      const parsed = parseInt(value);
      if (!isNaN(parsed)) {
        updateProductQuantity(id, parsed);
      }
    }
  };

  const handleInputBlur = () => {
    if (!inputValue || parseInt(inputValue) <= 0) {
      updateProductQuantity(id, 0);
      return;
    }

    updateProductQuantity(id, parseInt(inputValue));
  };

  return (
    <div className='product_card'>
      <Image src={image_url} width={200} height={200} alt='product_image' style={{ borderRadius: '10px' }} />
      <Title level={3} style={{ margin: 0 }}>
        {title}
      </Title>
      <hr style={{ border: '1px solid var(--border-color)' }} />
      <Paragraph style={{ margin: '0px 0px 10px 0px', padding: 0 }}>{description}</Paragraph>
      <Title level={5} style={{ margin: 0 }}>
        {price.toLocaleString('ru')} ₽
      </Title>
      {!quantity ? (
        <Button className='product_card_buy_button' onClick={() => addProduct({ id, quantity: 1 })}>
          В корзину
        </Button>
      ) : (
        <div className='product_card_quantity_controls'>
          <Button className='product_card_quantity_button' onClick={() => removeOneProduct(id)} disabled={!inputValue.trim()}>
            -
          </Button>
          <InputField
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            maxLength={10}
            className='product_card_input'
          />
          <Button className='product_card_quantity_button' onClick={() => addProduct({ id, quantity: 1 })}>
            +
          </Button>
        </div>
      )}
    </div>
  );
};
