import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PhoneNumberState {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

export const usePhoneNumberStore = create<PhoneNumberState>()(
  persist(
    (set) => ({
      phoneNumber: '',
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
    }),
    { name: 'phone-number-store' },
  ),
);
