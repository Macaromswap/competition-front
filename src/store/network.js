import { create } from 'zustand';

const useNetworkStore = create((set, get) => ({
    isLoaded: true,
    activeNetwork: 200810, // 200901
    userAddress: '',
    bgImg: '../assets/img/backgroundImg.png',
    setBgImg: (bg) => set({ bgImg: bg }),
    setUserAddress: (address) => set({ userAddress: address }),
}));

export { useNetworkStore };