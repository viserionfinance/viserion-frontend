import tokens from './tokens'
import {FarmConfig} from './types'

const farms: FarmConfig[] = [
    /**
     * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
     */
    {
        pid: 0,
        lpSymbol: 'VEFI-USDT',
        lpAddresses: {
            1088: '0x3d60afecf67e6ba950b499137a72478b2ca7c5a1',
            588: '0xb7Cb78739c6dE1560772B39c321dF924Ee4eF2D3',
        },
        token: tokens.viserion,
        quoteToken: tokens.usdt,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
    {
        pid: 1,
        lpSymbol: 'METIS-USDT',
        lpAddresses: {
            1088: '0x3d60afecf67e6ba950b499137a72478b2ca7c5a1',
            588: '0x74372617ADFdD14C19f79a07864c1B3CD2A3d1A2',
        },
        token: tokens.wbnb,
        quoteToken: tokens.usdt,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
    {
        pid: 2,
        lpSymbol: 'WETH-USDC',
        lpAddresses: {
            1088: '0x4db4ce7f5b43a6b455d3c3057b63a083b09b8376',
            588: '0x9a7F67b476116AAc2B14b8D74c27D661fbDf4e9d',
        },
        token: tokens.weth,
        quoteToken: tokens.usdc,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
    {
        pid: 3,
        lpSymbol: 'VEFI-WETH',
        lpAddresses: {
            1088: '',
            588: '0x937BE79b0eD3C555762A1cc3Df6ACdEeafCf7B0a',
        },
        token: tokens.viserion,
        quoteToken: tokens.weth,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
    {
        pid: 4,
        lpSymbol: 'VEFI-METIS',
        lpAddresses: {
            1088: '',
            588: '0x70a3Fe57Cdd84015cb3C250cD3b9aAE3488E583E',
        },
        token: tokens.viserion,
        quoteToken: tokens.wbnb,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
    {
        pid: 5,
        lpSymbol: 'VEFI-NETT',
        lpAddresses: {
            1088: '',
            588: '0x5a704d5559f4f1888e8feeeB3034545b5088aFe2',
        },
        token: tokens.viserion,
        quoteToken: tokens.nett,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
    {
        pid: 6,
        lpSymbol: 'VEFI-TETHYS',
        lpAddresses: {
            1088: '',
            588: '0x6629EA43606Fe9593E490108f7fD01B70081Ab2E',
        },
        token: tokens.viserion,
        quoteToken: tokens.tethys,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
    {
        pid: 7,
        lpSymbol: 'NETT-METIS',
        lpAddresses: {
            1088: '',
            588: '0xAB4d13F1e92aC6B1E26CeFB2ac3BDDfBc35e5F64',
        },
        token: tokens.nett,
        quoteToken: tokens.wbnb,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
    {
        pid: 8,
        lpSymbol: 'TETHYS-METIS',
        lpAddresses: {
            1088: '',
            588: '0x15a3E2c1cdfaEA146904aaeC3c311EB33E7B1339',
        },
        token: tokens.tethys,
        quoteToken: tokens.wbnb,
        multiplier: "40X",
        fee: "0.5",
        isPool: false
    },
]

// WETH - USDT : 0x4db4ce7f5b43a6b455d3c3057b63a083b09b8376
// METIS - USDT : 0x3d60afecf67e6ba950b499137a72478b2ca7c5a1
// NETT - USDT : 0x7d02ab940d7dd2b771e59633bbc1ed6ec2b99af1

// test

// WETH : 0x234bD71EF5E65B804Dc36ebc82637f6732C48DaE
// NETT : 0xA51E2671E57Da29ba3aa2C73b9f02252540D9a07
// TETTHYS : 0x99D5971c6A15e20b7b21DcD9d0DBe85803993C87

// {
//     metisUsdt: '0x74372617ADFdD14C19f79a07864c1B3CD2A3d1A2',
//     nettUsdt: '0x9541259C202b7D6343aC4aFBED6987795169477F',
//     wethUsdt: '0x9a7F67b476116AAc2B14b8D74c27D661fbDf4e9d'
//     tethysUSDT: 0x04317b9e2D077E1Af6F1368d7a6b1067bE6D69A7
// }

export default farms
