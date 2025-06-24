'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography } from 'antd';
import { ClientReview as IClientReview } from '@/interfaces/ClientReview';
import { ClientReview } from '@/components/clientReview/ClientReview';
import { Loader } from '@/ui/loader/Loader';
import api from '../../../axiosInstance';
import './home.css';
import './responsive.css';
import { AnimatePresence, motion } from 'framer-motion';

const { Title } = Typography;

const NAMES: string[] = [
  'Анна Петрова',
  'Иван Иванов',
  'Екатерина Смирнова',
  'Дмитрий Кузнецов',
  'Ольга Орлова',
  'Алексей Соколов',
  'Наталья Федорова',
  'Максим Волков',
  'Мария Белова',
  'Сергей Морозов',
];

export default function Home() {
  const [clientsReviews, setClientsReviews] = useState<IClientReview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getClientsReview = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await api.get<IClientReview[]>(`/reviews`);
      setClientsReviews(response.data);
      setError(null);
    } catch {
      setError('Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getClientsReview();
  }, [getClientsReview]);

  const shuffledNames = useMemo(() => {
    return [...NAMES].sort(() => 0.5 - Math.random());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='home'>
      <Title level={1} style={{ margin: '0px 0px 20px 0px', textAlign: 'center' }}>
        Что говорят наши клиенты
      </Title>
      {error ? (
        <Title level={4} style={{ textAlign: 'center', color: 'var(--red-color)' }}>
          {error}
        </Title>
      ) : (
        <div className='home_clients_reviews_grid'>
          <AnimatePresence>
            {clientsReviews.map((clientReview, index) => (
              <motion.div
                key={clientReview.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: index < 6 ? index * 0.03 : 0.15,
                  duration: 0.2,
                }}
              >
                <ClientReview key={clientReview.id} text={clientReview.text} clientName={shuffledNames[index]} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
