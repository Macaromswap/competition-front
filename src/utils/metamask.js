import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

// 获取提供者
export const getProvide = async() => {
    return await detectEthereumProvider()
}

// 获取签名者
export const getSigner = async() => {
    const ethereum = await getProvide()
    const provider = new ethers.providers.Web3Provider(ethereum)
    return provider.getSigner()
}

// 获取签名者
export const getUserAddress = async() => {
    const signer = await getSigner()
    return signer.getAddress()
}

// 查看当前是否可以发出rpc请求
export const isConnectMetaMask = async() => {
    const ethereum = await getProvide()
    return await ethereum.isConnected()
}

// 连接metamask会拿到当前选择的地址
export const connectAccount = async() => {
    const data = {
        code: 200,
        address: '',
        msg: '连接钱包获取地址成功',
    }
    try {
        const ethereum = await getProvide()
        let address = await ethereum.request({ method: 'eth_requestAccounts' })
        data.address = address[0]
    } catch (error) {
        if (error.code == 4001) {
            data.code = error.code
            data.msg = '取消连接钱包'
        }
    }
    return data
}

// 获取当前链接的网络id
export const getCurrentNetWork = async() => {
    const ethereum = await getProvide()
    return await ethereum.networkVersion
}

// 连接后直接获取当前账号地址(无需再发送rpc请求)
export const getCurrentAddress = async() => {
    const ethereum = await getProvide()
    return await ethereum.selectedAddress
}

// 监听链变化
export const monitorChangeNetWork = async(callBack) => {
    const ethereum = await getProvide()
    ethereum.on('chainChanged', (chainId) => callBack(chainId))
}

// 监听账号变化
export const onAccountChange = async(callback) => {
    const ethereum = await getProvide()
    ethereum.on('accountsChanged', (account) => {
        console.log(account)
        callback(account[0])
    })
}

// 切换bnb网络
export const changeBnbNetwork = async() => {
    try {
        const ethereum = await getProvide()
        await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x38',
                chainName: 'BSC',
                nativeCurrency: {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18,
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/'],
            }, ],
        })
        return true
    } catch (error) {
        console.log('切换网络出错', error)
    }
}

// 签名
export const signMessage = async(str) => {
    const singer = await getSigner()
    return await singer.signMessage(str)
}