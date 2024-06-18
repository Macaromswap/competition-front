import { create } from 'zustand';

const useNetworkStore = create((set, get) => ({
    isLoaded: true,
    activeNetwork: 200901, // 200810
    userAddress: '',
    bgImg: '../assets/img/backgroundImg.png',
    setBgImg: (bg) => set({ bgImg: bg }),
    setUserAddress: (address) => set({ userAddress: address }),
}));

export { useNetworkStore };