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
  updateProductQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartProducts: [],
      showCart: false,
      setShowCart: (showCart: boolean) => set(() => ({ showCart })),
      clearCart: () => set(() => ({ cartProducts: [] })),
      addProduct: (product: CartProduct) =>
        set((state) => {
          const existingProductIndex = state.cartProducts.findIndex((p) => p.id === product.id);

          if (existingProductIndex !== -1) {
            const updatedProducts = [...state.cartProducts];
            updatedProducts[existingProductIndex].quantity += 1;
            return { cartProducts: updatedProducts };
          }

          return { cartProducts: [...state.cartProducts, { ...product, quantity: 1 }] };
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
