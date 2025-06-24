'use client';

import { useState, useEffect, useCallback } from 'react';
import { Typography } from 'antd';
import { Product } from '@/interfaces/Product';
import { ProductCard } from '@/components/productCard/ProductCard';
import { Loader } from '@/ui/loader/Loader';
import api from '../../../axiosInstance';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AnimatePresence, motion } from 'framer-motion';
import './products.css';
import './responsive.css';

const { Title } = Typography;

const PAGE_SIZE: number = 20;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/products?page=1&page_size=${PAGE_SIZE}`);
      const newProducts: Product[] = response.data.items;

      setProducts(newProducts);
      setPage(1);
      setHasMore(newProducts.length === PAGE_SIZE);
      setError(null);
    } catch {
      setError('Не удалось загрузить продукты. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMoreProducts = useCallback(async () => {
    try {
      const nextPage = page + 1;
      const response = await api.get(`/products?page=${nextPage}&page_size=${PAGE_SIZE}`);
      const newProducts: Product[] = response.data.items;

      setProducts((prev) => [...prev, ...newProducts]);
      setPage(nextPage);
      setHasMore(newProducts.length === PAGE_SIZE);
      setError(null);
    } catch {
      setError('Не удалось загрузить продукты. Пожалуйста, попробуйте позже.');
    }
  }, [page]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Title level={1} style={{ margin: '0px 0px 20px 0px', textAlign: 'center' }}>
        Продукты
      </Title>

      {error ? (
        <Title level={4} style={{ textAlign: 'center', color: 'var(--red-color)' }}>
          {error}
        </Title>
      ) : (
        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreProducts}
          hasMore={hasMore}
          loader={<Loader style={{ marginTop: 10, width: '40px', height: '40px' }} />}
          endMessage={
            <Title level={5} style={{ textAlign: 'center', margin: '10px 0px 0px 0px', color: 'var(--red-color)' }}>
              Продуктов больше нет!
            </Title>
          }
          style={{ overflowY: 'hidden' }}
        >
          <div className='products_grid'>
            <AnimatePresence>
              {products.map((product, index) => {
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: index < 6 ? index * 0.03 : 0.15,
                      duration: 0.2,
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Products;
