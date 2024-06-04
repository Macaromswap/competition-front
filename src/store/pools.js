import { create } from "zustand";
import { getSwapPools } from "../api";

const usePoolStore = create((set, get) => ({
    swapPoolsList: [],

    updateAllList: async(chainId) => {
        set({ updateList: false });
        const swapPoolsData = await getSwapPools(chainId);

        let swapPools = {}
        if (Object.keys(swapPoolsData.data).length) {
            swapPoolsData?.data.map(item => {
                swapPools[item.pair_address] = {
                    ...item,
                }
            });
        }
        set({
            swapPoolsList: swapPools,
            updateList: true
        });
    }
}))

export {
    usePoolStore
}