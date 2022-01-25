import {ChainId} from 'config/chainId'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
    [ChainId.MAINNET]: '0x4c0878e9Dbc0D6a15c8605Cc98B898879ae8AF29',
    [ChainId.TESTNET]: '0x97D65D5D09C496cE995297297CD885582BEbB072',
}

export {MULTICALL_ABI, MULTICALL_NETWORKS}
