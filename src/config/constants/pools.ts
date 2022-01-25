import tokens from './tokens'
import {PoolCategory, PoolConfig} from './types'

const pools: PoolConfig[] = [
    {
        sousId: 0,
        stakingToken: tokens.viserion,
        earningToken: tokens.usdt,
        contractAddress: {
            1088: '0x32Ef15B497713B2DbA4FC8195Ae1579453b54c69',
            588: '0x111b99F96cf4B47b9439444DF86940f73b7Bd1FC',
        },
        poolCategory: PoolCategory.CORE,
        harvest: true,
        tokenPerBlock: '10',
        sortOrder: 1,
        isFinished: false,
    }
]

export default pools
