import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/interfaces/Product';

interface CartProduct extends Product {
  quantity: number;
}

interface CartState {
  cartProducts: CartProduct[];
  showCart: boolean;
  setShowCart: (showCart: boolean) => void;
  clearCart: () => void;
  addProduct: (product: Product & { quantity?: number }) => void;
  deleteProduct: (productId: number) => void;
  removeOneProduct: (productId: number) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartProducts: [],
      showCart: false,
      setShowCart: (showCart: boolean) => set(() => ({ showCart })),
      clearCart: () => set(() => ({ cartProducts: [] })),
      addProduct: (product: Product & { quantity?: number }) =>
        set((state) => {
          const existingIndex = state.cartProducts.findIndex((p) => p.id === product.id);

          if (existingIndex !== -1) {
            const updated = [...state.cartProducts];
            const addedQuantity = product.quantity ?? 1;
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + addedQuantity,
            };
            return { cartProducts: updated };
          }

          return {
            cartProducts: [...state.cartProducts, { ...product, quantity: product.quantity ?? 1 }],
          };
        }),

      deleteProduct: (productId: number) => {
        set((state) => {
          const updatedProducts = state.cartProducts.filter((product) => product.id !== productId);
          return { cartProducts: updatedProducts };
        });
      },
      removeOneProduct: (productId: number) => {
        set((state) => {
          const updatedProducts = state.cartProducts
            .map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  quantity: product.quantity > 1 ? product.quantity - 1 : 0,
                };
              }
              return product;
            })
            .filter((product) => product.quantity > 0);

          return { cartProducts: updatedProducts };
        });
      },
      updateProductQuantity: (id: number, newQty: number) =>
        set((state) => {
          if (newQty <= 0) {
            return {
              cartProducts: state.cartProducts.filter((p) => p.id !== id),
            };
          }

          return {
            cartProducts: state.cartProducts.map((p) => (p.id === id ? { ...p, quantity: newQty } : p)),
          };
        }),
    }),
    {
      name: 'cart-store',
    },
  ),
);
