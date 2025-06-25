'use client';

import { Modal, Typography, Button, message } from 'antd';
import { useCartStore } from '@/stores/useCartStore/UseCartStore';
import { useMemo, useState } from 'react';
import { InputField } from '../inputField/InputField';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePhoneNumberStore } from '@/stores/usePhoneNumberStore/UsePhoneNumberStore';
import api from '../../../axiosInstance';
import './cartModal.css';
import './responsive.css';

const { Title, Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CartModal = ({ open, onClose }: Props) => {
  const { cartProducts, removeOneProduct, updateProductQuantity, clearCart, deleteProduct } = useCartStore();
  const { phoneNumber, setPhoneNumber } = usePhoneNumberStore();

  const [messageApi, messageContextHolder] = message.useMessage({ maxCount: 2 });
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);

  const isPhoneValid = /^7\d{10}$/.test(phoneNumber);
  const isPhoneError = isPhoneTouched && !isPhoneValid;

  const total = useMemo(() => {
    return cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }, [cartProducts]);

  const totalItems = cartProducts.reduce((sum, product) => sum + product.quantity, 0);

  const onSubmitHandler = async () => {
    setIsPhoneTouched(true);

    if (!isPhoneValid) {
      messageApi.open({
        type: 'error',
        content: 'Введите корректный номер телефона!',
      });
      return;
    }

    setIsSubmitLoading(true);
    try {
      await api.post('/order', {
        phone: phoneNumber,
        cart: cartProducts.map((p) => ({ id: p.id, quantity: p.quantity })),
      });

      clearCart();
      onClose();

      messageApi.open({
        type: 'success',
        content: 'Заказ успешно оформлен!',
      });
    } catch {
      messageApi.open({
        type: 'error',
        content: 'Ошибка при оформлении заказа!',
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      {messageContextHolder}
      <Modal
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCartOutlined style={{ fontSize: '24px' }} />
            Корзина ({totalItems})
          </span>
        }
        open={open}
        onCancel={onClose}
        footer={null}
      >
        {!cartProducts.length ? (
          <div style={{ textAlign: 'center' }}>
            <Text style={{ color: 'var(--secondary-text-color)' }}>Корзина пуста</Text>
          </div>
        ) : (
          <div>
            <InputField
              placeHolder='Номер Телефона 7XXXXXXXXXX'
              value={phoneNumber}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, '');
                setPhoneNumber(onlyDigits);
                setIsPhoneTouched(true);
              }}
              maxLength={11}
              status={isPhoneError ? 'error' : ''}
            />
            <div className='cart_modal_list'>
              {cartProducts.map((product) => (
                <div key={product.id} className='cart_modal_item'>
                  <div className='cart_modal_item_info'>
                    <Text strong>{product.title}</Text>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Text>{product.price.toLocaleString('ru')} ₽</Text>
                      <Button
                        className='cart_modal_delete_button'
                        type='text'
                        icon={<DeleteOutlined style={{ color: 'var(--red-color)', fontSize: '24px' }} />}
                        onClick={() => deleteProduct(product.id)}
                      />
                    </div>
                  </div>

                  <div className='cart_modal_quantity_controls'>
                    <Button className='cart_modal_quantity_button' onClick={() => removeOneProduct(product.id)}>
                      -
                    </Button>
                    <Text>{product.quantity}</Text>
                    <Button className='cart_modal_quantity_button' onClick={() => updateProductQuantity(product.id, product.quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>
              ))}

              <div className='cart_modal_total'>
                <Title level={4}>Итого: {total.toLocaleString('ru')} ₽</Title>
                <Button type='primary' block loading={isSubmitLoading} onClick={onSubmitHandler}>
                  Оформить заказ
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
