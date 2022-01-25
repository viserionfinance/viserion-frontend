import {ChainId, Currency, currencyEquals, JSBI, Price, WETH} from 'sdk'

import {useEffect, useMemo} from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {BUSD} from '../config/constants/tokens'
import {PairState, usePairs} from './usePairs'
import {wrappedCurrency} from '../utils/wrappedCurrency'
import {fetchFarmsPublicDataAsync} from "../state/farms";
import {useAppDispatch} from "../state";
import {useFarmFromPid} from "../state/farms/hooks";

const BUSD_MAINNET = BUSD[ChainId.MAINNET]

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function useBUSDPrice(currency?: Currency): Price | undefined {
    const {chainId} = useActiveWeb3React()
    const wrapped = wrappedCurrency(currency, chainId)
    const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
        () => [
            [
                chainId && wrapped && currencyEquals(WETH[chainId], wrapped) ? undefined : currency,
                chainId ? WETH[chainId] : undefined,
            ],
            [wrapped?.equals(BUSD_MAINNET) ? undefined : wrapped, chainId === ChainId.MAINNET ? BUSD_MAINNET : undefined],
            [chainId ? WETH[chainId] : undefined, chainId === ChainId.MAINNET ? BUSD_MAINNET : undefined],
        ],
        [chainId, currency, wrapped],
    )
    const [[ethPairState, ethPair], [busdPairState, busdPair], [busdEthPairState, busdEthPair]] = usePairs(tokenPairs)

    return useMemo(() => {
        if (!currency || !wrapped || !chainId) {
            return undefined
        }
        // handle weth/eth
        if (wrapped.equals(WETH[chainId])) {
            if (busdPair) {
                const price = busdPair.priceOf(WETH[chainId])
                // @ts-ignore
                return new Price(currency, BUSD_MAINNET, price.denominator, price.numerator)
            }
            return undefined
        }
        // handle busd
        if (wrapped.equals(BUSD_MAINNET)) {
            return new Price(BUSD_MAINNET, BUSD_MAINNET, '1', '1')
        }

        const ethPairETHAmount = ethPair?.reserveOf(WETH[chainId])
        // @ts-ignore
        const ethPairETHBUSDValue: JSBI =
            ethPairETHAmount && busdEthPair ? busdEthPair.priceOf(WETH[chainId]).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

        // all other tokens
        // first try the busd pair
        if (
            busdPairState === PairState.EXISTS &&
            busdPair &&
            // @ts-ignore
            busdPair.reserveOf(BUSD_MAINNET).greaterThan(ethPairETHBUSDValue)
        ) {
            const price = busdPair.priceOf(wrapped)
            // @ts-ignore
            return new Price(currency, BUSD_MAINNET, price.denominator, price.numerator)
        }
        if (ethPairState === PairState.EXISTS && ethPair && busdEthPairState === PairState.EXISTS && busdEthPair) {
            if (busdEthPair.reserveOf(BUSD_MAINNET).greaterThan('0') && ethPair.reserveOf(WETH[chainId]).greaterThan('0')) {
                const ethBusdPrice = busdEthPair.priceOf(BUSD_MAINNET)
                const currencyEthPrice = ethPair.priceOf(WETH[chainId])
                const busdPrice = ethBusdPrice.multiply(currencyEthPrice).invert()
                // @ts-ignore
                return new Price(currency, BUSD_MAINNET, busdPrice.denominator, busdPrice.numerator)
            }
        }
        return undefined
    }, [chainId, currency, ethPair, ethPairState, busdEthPair, busdEthPairState, busdPair, busdPairState, wrapped])
}

export const useCakeBusdPrice = (): any | undefined => {

    const farm = useFarmFromPid(0)
    const cakeBusdPrice = farm.tokenPriceVsQuote
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchFarmData = async () => {
            await dispatch(fetchFarmsPublicDataAsync([0]))
        }
        fetchFarmData()

    }, [dispatch])


    return cakeBusdPrice
}
