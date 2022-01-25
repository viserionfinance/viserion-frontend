import {ChainId} from 'config/chainId'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: 'https://andromeda.metis.io/?owner=1088',
    [ChainId.TESTNET]: 'https://stardust.metis.io/?owner=588',
}

export default NETWORK_URLS
