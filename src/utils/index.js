import { getAddress } from '@ethersproject/address'

export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

export function shortenAddress(address, chars = 4) {
    if (address === '') {
        return '-'
    }
    return `${address.substring(0, 6)}...${address.substring(42 - 4)}`
}

export function getEtherscanLink(chainId, data, type) {
    const prefix = `https://www.btrscan.com`
    let link = ''
    switch (type) {
        case 'transaction':
            link = `${prefix}/tx/${data}`
            break;
        case 'token':
            link = `${prefix}/token/${data}`
            break;
        case 'block':
            link = `${prefix}/block/${data}`
            break;
        case 'address':
            link = `${prefix}/address/${data}`
            break;
        default:
            return
    }
    if (link) {
        window.open(link, '_blank')
    }
}

const hostName = () => {
    const currentDomain = window.location.hostname;
    if (currentDomain.includes('biz')) {
        return 'https://www.macaron.biz'
    } else {
        return 'https://www.macaron.xyz'
    }
}
const hostNameInfo = () => {
    const currentDomain = window.location.hostname;
    if (currentDomain.includes('biz')) {
        return 'https://info.macaron.biz'
    } else {
        return 'https://info.macaron.xyz'
    }
}
export function toMacaronRoute(route) {
    const tradeURL = hostName()
    const link = `${tradeURL}/#${route}`
    window.open(link, '_blank')
}

export function toMacaronInfo(route) {
    const InfoURL = hostNameInfo()
    const link = `${InfoURL}/#${route}`
    window.open(link, '_blank')
}
export function toGoPlus() {
    const link = 'https://gopluslabs.io/'
    window.open(link, '_blank')
}

const links = {
    'x': 'https://x.com/macarondex',
    'medium': 'https://macarondex.medium.com/',
    'tg': 'https://t.me/macarondex',
    'github': 'https://github.com/Macaromswap',
    'gitbook': 'https://macaron.gitbook.io/macaron-bitlayers-native-dex',
    'doc': 'https://macaron.gitbook.io/macaron-bitlayers-native-dex',
    'security': 'https://github.com/Macaromswap/Audited',
    'brandKit': 'https://github.com/Macaromswap/BrandKit',
    'ecosystem': 'https://www.macaron.biz/#/ecosystem?lang=en',
    'token': 'https://info.macaron.biz/#/tokens',
    'tgLink': 'https://t.me/Macaron_Riders',
    'getSat': 'https://app.satoshiprotocol.org/',
    'satTgLink': 'https://t.me/Macaron_Riders'
}

export function goLink(text) {
    let link = links[text]
    if (link) {
        window.open(link, '_blank')
    }
}