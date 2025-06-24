'use client';

import { Rate, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import './clientReview.css';

const { Title, Paragraph, Text } = Typography;

const parseHTML = (html: string) => {
  if (typeof window === 'undefined') return { title: '', description: '' };
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const title = doc.querySelector('h1')?.textContent?.trim() || '';
  const description = doc.querySelector('p')?.textContent?.trim() || '';
  return { title, description };
};

type HTMLString = string;

interface Props {
  text: HTMLString;
  clientName: string;
}

export const ClientReview = ({ text, clientName }: Props) => {
  const { title, description } = parseHTML(text);

  const randomRating = useMemo(() => Math.floor(Math.random() * 2) + 4, []);

  return (
    <div className='client_review'>
      <div className='client_review_avatar_wrapper'>
        <Avatar
          size={64}
          style={{ backgroundColor: 'var(--secondary-text-color)' }}
          icon={<UserOutlined style={{ color: 'var(--background-color)' }} />}
        />
      </div>

      <Rate className='custom_rate' count={5} disabled defaultValue={randomRating} style={{ color: 'var(--green-color)' }} />
      <Title level={4} style={{ margin: '10px 0px 10px 0px' }}>
        {title}
      </Title>
      <Paragraph style={{ margin: '0px 0px 10px 0px' }}>{`"${description}"`}</Paragraph>
      <Text>- {clientName}</Text>
    </div>
  );
};
