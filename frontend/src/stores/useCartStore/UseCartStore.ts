import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartProduct } from '@/interfaces/CartProduct';

interface CartState {
  cartProducts: CartProduct[];
  showCart: boolean;
  setShowCart: (showCart: boolean) => void;
  clearCart: () => void;
  addProduct: (product: CartProduct) => void;
  deleteProduct: (productId: number) => void;
  removeOneProduct: (productId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartProducts: [],
      showCart: false,
      setShowCart: (showCart: boolean) => {
        set(() => ({
          showCart,
        }));
      },
      clearCart: () => {
        set(() => {
          return {
            cartProducts: [],
          };
        });
      },
      addProduct: (product: CartProduct) =>
        set((state) => {
          const existingProductIndex = state.cartProducts.findIndex((p) => p.id === product.id);

          if (existingProductIndex !== -1) {
            const updatedProducts = [...state.cartProducts];
            updatedProducts[existingProductIndex].quantity += 1;
            return { products: updatedProducts };
          }

          return { cartProducts: [...state.cartProducts, { ...product, amount: 1 }] };
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
                  amount: product.quantity > 1 ? product.quantity - 1 : 0,
                };
              }
              return product;
            })
            .filter((product) => product.quantity > 0);

          return { cartProducts: updatedProducts };
        });
      },
    }),
    {
      name: 'cart-store',
    },
  ),
);
