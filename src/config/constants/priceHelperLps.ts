import tokens from './tokens'
import {FarmConfig} from './types'

const priceHelperLps: FarmConfig[] = [
    /**
     * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
     * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
     * The absense of a PID means the masterchef contract calls are skipped for this farm.
     * Prices are then fetched for all farms (masterchef + priceHelperLps).
     * Before storing to redux, farms without a PID are filtered out.
     */
    {
        pid: null,
        lpSymbol: 'VEFI-METIS LP',
        lpAddresses: {
            1088: '',
            588: '0xA9cD416417DfAbe133c78b1CFfB96f0b04762FE1',
        },
        token: tokens.viserion,
        quoteToken: tokens.wbnb,
        isPool: false
    },
]

export default priceHelperLps
