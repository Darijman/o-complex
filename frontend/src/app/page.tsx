'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography } from 'antd';
import { ClientReview as IClientReview } from '@/interfaces/ClientReview';
import { ClientReview } from '@/components/clientReview/ClientReview';
import { Loader } from '@/ui/loader/Loader';
import api from '../../axiosInstance';
import './home.css';

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
        <div className='home_reviews_error'>
          <Title level={4} style={{ textAlign: 'center', color: 'var(--red-color)' }}>
            {error}
          </Title>
        </div>
      ) : (
        <div className='home_clients_reviews_grid'>
          {clientsReviews.map((clientReview, index) => {
            const { id, text } = clientReview;
            return <ClientReview key={id} text={text} clientName={shuffledNames[index]} />;
          })}
        </div>
      )}
    </div>
  );
}
