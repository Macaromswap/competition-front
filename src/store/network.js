import { create } from 'zustand';

const useNetworkStore = create((set, get) => ({
    isLoaded: true,
    activeNetwork: 200901,
    userAddress: '',
    setUserAddress: (address) => set({ userAddress: address }),
}));

export { useNetworkStore };