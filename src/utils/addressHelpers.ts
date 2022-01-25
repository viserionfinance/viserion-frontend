import {ChainId} from 'config/chainId'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import {Address} from 'config/constants/types'

export const getAddress = (address: Address): string => {
    const chainId = process.env.REACT_APP_CHAIN_ID
    return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getCakeAddress = () => {
    return getAddress(tokens.viserion.address)
}
export const getMasterChefAddress = () => {
    return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
    return getAddress(addresses.multiCall)
}
export const getWbnbAddress = () => {
    return getAddress(tokens.wbnb.address)
}
export const getIdoAddress = () => {
    return getAddress(addresses.ido)
}
export const getPoolStakeAddress = () => {
    return getAddress(addresses.pool)
}