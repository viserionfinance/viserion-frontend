import {ChainId, Token} from 'sdk'

export const CAKE: { [chainId: number]: Token } = {
    [ChainId.MAINNET]: new Token(
        ChainId.MAINNET,
        '0xA9cD416417DfAbe133c78b1CFfB96f0b04762FE1',
        18,
        'VeFI',
        'Viserion Finance',
    ),
    [ChainId.TESTNET]: new Token(
        ChainId.TESTNET,
        '0x07803Ff7B557441FF979B61Ff5132A6CF1151DFf',
        18,
        'VeFI',
        'Viserion Finance',
    ),
}

export const BUSD: { [chainId: number]: Token } = {
    [ChainId.MAINNET]: new Token(
        ChainId.MAINNET,
        '0xea32a96608495e54156ae48931a7c20f0dcc1a21',
        18,
        'USDC',
        'USDC Token',
    ),
    [ChainId.TESTNET]: new Token(
        ChainId.TESTNET,
        '0xea32a96608495e54156ae48931a7c20f0dcc1a21',
        18,
        'USDC',
        'USDC Token',
    ),
}

export const WBNB = new Token(ChainId.MAINNET, '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000', 18, 'METIS', 'METIS Token')

export const ETH = new Token(
    ChainId.MAINNET,
    '0xA9cD416417DfAbe133c78b1CFfB96f0b04762FE1',
    18,
    'ETH',
    'Ethereum Token',
)

const tokens = {
    bnb: {
        symbol: 'METIS',
        projectLink: '',
    },
    viserion: {
        symbol: 'VEFI',
        address: {
            1088: '0xA9cD416417DfAbe133c78b1CFfB96f0b04762FE1',
            588: '0x07803Ff7B557441FF979B61Ff5132A6CF1151DFf',
        },
        decimals: 18,
        projectLink: '',
    },
    wbnb: {
        symbol: 'METIS',
        address: {
            1088: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
            588: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
        },
        decimals: 18,
        projectLink: '#',
    },
    usdt: {
        symbol: 'USDT',
        address: {
            1088: '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
            588: '0x0BAc25B9EA14F099aFA950067377298Dd047f9bC',
        },
        decimals: 18,
        projectLink: '#',
    },
    weth: {
        symbol: "WETH",
        address: {
            1088: "",
            588: "0x234bD71EF5E65B804Dc36ebc82637f6732C48DaE"
        },
        decimals: 18,
        projectLink: ""
    },
    usdc: {
        symbol: "USDC",
        address: {
            1088: "",
            588: "0x0BAc25B9EA14F099aFA950067377298Dd047f9bC"
        },
        decimals: 18,
        projectLink: ""
    },
    nett: {
        symbol: "NETT",
        address: {
            1088: "",
            588: "0xA51E2671E57Da29ba3aa2C73b9f02252540D9a07"
        },
        decimals: 18,
        projectLink: ""
    },
    tethys: {
        symbol: "TETHYS",
        address: {
            1088: "",
            588: "0x99D5971c6A15e20b7b21DcD9d0DBe85803993C87"
        },
        decimals: 18,
        projectLink: ""
    }
}

export default tokens
