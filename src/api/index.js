import request from '../utils/request'

export const getSwapPools = (chainId, params) => {
    return request({
        url: `/pair/${chainId}/pools`,
        method: 'get',
        params
    })
}
export const getSwapRank = (chainId, params) => {
    return request({
        url: `/pair/${chainId}/swap/rank`,
        method: 'get',
        params
    })
}
export const getSwapTx = (chainId, params) => {
    return request({
        url: `/pair/${chainId}/tx/rank`,
        method: 'get',
        params
    })
}
export const getTvlRank = (chainId, params) => {
    return request({
        url: `/pair/${chainId}/tvl/rank`,
        method: 'get',
        params
    })
}