export const UNSUPPORTED_LIST_URLS: string[] = []

const PANCAKE_EXTENDED = 'https://raw.githubusercontent.com/Netswap/token-lists/master/top100.tokenlist.json'
const PANCAKE_TOP100 = 'https://raw.githubusercontent.com/Netswap/token-lists/master/defi.tokenlist.json'

const METIS_TESTNET_LIST = 'https://raw.githubusercontent.com/Netswap/token-lists/master/test.tokenlist.json'
const METIS_MAINNET_LIST = 'https://raw.githubusercontent.com/Netswap/token-lists/master/top100.tokenlist.json'
export const METIS_MAINNET_DEFI = 'https://raw.githubusercontent.com/Netswap/token-lists/master/defi.tokenlist.json'
export const METIS_MAINNET_MB = 'https://raw.githubusercontent.com/Netswap/token-lists/master/mb.tokenlist.json'
export const METIS_MAINNET_OB = 'https://raw.githubusercontent.com/Netswap/token-lists/master/ob.tokenlist.json'
export const METIS_MAINNET_POLY = 'https://raw.githubusercontent.com/Netswap/token-lists/master/pb.tokenlist.json'
export const METIS_MAINNET_RB = 'https://raw.githubusercontent.com/Netswap/token-lists/master/rb.tokenlist.json'

export const DEFAULT_LIST_OF_LISTS: string[] = [
    // COMPOUND_LIST,
    // AAVE_LIST,
    // SYNTHETIX_LIST,
    // UMA_LIST,
    // WRAPPED_LIST,
    // SET_LIST,
    // OPYN_LIST,
    // ROLL_LIST,
    // COINGECKO_LIST,
    // CMC_ALL_LIST,
    // CMC_STABLECOIN,
    // KLEROS_LIST,
    // GEMINI_LIST,
    // METIS_TESTNET_LIST,
    METIS_MAINNET_LIST,
    METIS_MAINNET_DEFI,
    METIS_MAINNET_MB,
    METIS_MAINNET_OB,
    METIS_MAINNET_POLY,
    METIS_MAINNET_RB,
    ...UNSUPPORTED_LIST_URLS // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [
    METIS_MAINNET_LIST,
    METIS_TESTNET_LIST,
    METIS_MAINNET_DEFI,
    METIS_MAINNET_MB,
    METIS_MAINNET_OB,
    METIS_MAINNET_POLY,
    METIS_MAINNET_RB
]
