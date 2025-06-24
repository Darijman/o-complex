'use client';

import { Typography, Button } from 'antd';
import { Product } from '@/interfaces/Product';
import Image from 'next/image';
import './productCard.css';

const { Title, Text, Paragraph } = Typography;

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { id, image_url, title, description, price } = product;

  return (
    <div className='product_card'>
      <Image src={image_url} width={200} height={100} alt='product_image' />
      <Title style={{ margin: 0 }}>{title}</Title>
      <Paragraph style={{ margin: 0, padding: 0 }}>{description}</Paragraph>
      <Text>Цена: {price}₽</Text>
      <Button>Купить</Button>
    </div>
  );
};
