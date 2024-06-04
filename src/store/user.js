import { create } from "zustand";
import { getSwapRank, getSwapTx } from "../api";
import { useWatchListStore } from "./index";

const useUserStore = create((set, get) => ({
    updateList: false,
    rankList: [],
    latestList: [],
    updateAllList: async(chainId) => {
        set({ updateList: false });
        const [rank, latest] = await Promise.all([
            getSwapRank(chainId, { start_time: 1716134400000, end_time: 1716912000000, limit: 70 }),
            getSwapTx(chainId),
        ]);
        console.log(rank, latest);
        set({
            rankList: rank.data.list,
            latestList: latest.data.swap.slice(0, 10),
            updateList: true
        });
    }
}))

export {
    useUserStore,
}