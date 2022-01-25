import {useMemo} from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
    getBep20Contract,
    getCakeContract,
    getErc721Contract,
    getIdoContract,
    getIfoV1Contract,
    getIfoV2Contract,
    getMasterchefContract,
    getPoolContract,
    getSouschefContract,
    getSouschefV2Contract
} from 'utils/contractHelpers'

// Imports below migrated from Exchange useContract.ts
import {Contract} from '@ethersproject/contracts'
import {ChainId, WETH} from 'sdk'
import {abi as IUniswapV2PairABI} from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import ENS_PUBLIC_RESOLVER_ABI from '../config/abi/ens-public-resolver.json'
import ENS_ABI from '../config/abi/ens-registrar.json'
import IFactory from '../config/abi/IFactory.json'
import {ERC20_BYTES32_ABI} from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import WETH_ABI from '../config/abi/weth.json'
import {MULTICALL_ABI, MULTICALL_NETWORKS} from '../config/constants/multicall'
import {getContract} from '../utils'
import {ROUTER_ADDRESS} from "../config/constants";

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getIfoV1Contract(address, library.getSigner()), [address, library])
}

export const useIfoV2Contract = (address: string) => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getIfoV2Contract(address, library.getSigner()), [address, library])
}

export const useERC20 = (address: string) => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getErc721Contract(address, library.getSigner()), [address, library])
}

export const useCake = () => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getCakeContract(library.getSigner()), [library])
}

export const useMasterchef = () => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getMasterchefContract(library.getSigner()), [library])
}

export const useSousChef = (id) => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getSouschefContract(id, library.getSigner()), [id, library])
}

export const useIdoContact = () => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getIdoContract(library.getSigner()), [library])
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const {library, account} = useActiveWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
    const {chainId} = useActiveWeb3React()
    return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
    const {chainId} = useActiveWeb3React()
    let address: string | undefined
    if (chainId) {
        // eslint-disable-next-line default-case
        switch (chainId) {
            case ChainId.MAINNET:
            case ChainId.TESTNET:
                address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
                break
        }
    }
    return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
    return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useFactoryContract() {
    return useContract(ROUTER_ADDRESS, IFactory, false)
}

export const usePoolContract = () => {
    const {library} = useActiveWeb3React()
    return useMemo(() => getPoolContract(library.getSigner()), [library])
}


export function useMulticallContract(): Contract | null {
    const {chainId} = useActiveWeb3React()
    return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}
