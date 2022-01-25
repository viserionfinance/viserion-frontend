import {useEffect, useMemo} from 'react'
import {useWeb3React} from '@web3-react/core'
import {useSelector} from 'react-redux'
import {ethers} from 'ethers'
import {minBy} from 'lodash'
import {useAppDispatch} from 'state'
import Nfts from 'config/constants/nfts'
import {State} from './types'

// /!\
// Don't add anything here. These hooks will be moved the the predictions folder

/**
 * Used to get the range of rounds to poll for
 */
export const useGetEarliestEpoch = () => {
    return useSelector((state: State) => {
        const earliestRound = minBy(Object.values(state.predictions.rounds), 'epoch')
        return earliestRound?.epoch
    })
}

export const useIsHistoryPaneOpen = () => {
    return useSelector((state: State) => state.predictions.isHistoryPaneOpen)
}

export const useIsChartPaneOpen = () => {
    return useSelector((state: State) => state.predictions.isChartPaneOpen)
}

export const useGetCurrentEpoch = () => {
    return useSelector((state: State) => state.predictions.currentEpoch)
}

export const useGetIntervalBlocks = () => {
    return useSelector((state: State) => state.predictions.intervalBlocks)
}

export const useGetBufferBlocks = () => {
    return useSelector((state: State) => state.predictions.bufferBlocks)
}

export const useGetTotalIntervalBlocks = () => {
    const intervalBlocks = useGetIntervalBlocks()
    const bufferBlocks = useGetBufferBlocks()
    return intervalBlocks + bufferBlocks
}

export const useGetPredictionsStatus = () => {
    return useSelector((state: State) => state.predictions.status)
}

export const useGetHistoryFilter = () => {
    return useSelector((state: State) => state.predictions.historyFilter)
}

export const useGetCurrentRoundBlockNumber = () => {
    return useSelector((state: State) => state.predictions.currentRoundStartBlockNumber)
}

export const useGetMinBetAmount = () => {
    const minBetAmount = useSelector((state: State) => state.predictions.minBetAmount)
    return useMemo(() => ethers.BigNumber.from(minBetAmount), [minBetAmount])
}

export const useGetRewardRate = () => {
    const rewardRate = useSelector((state: State) => state.predictions.rewardRate)
    return rewardRate / 100
}

export const useGetIsFetchingHistory = () => {
    return useSelector((state: State) => state.predictions.isFetchingHistory)
}

export const useGetHistory = () => {
    return useSelector((state: State) => state.predictions.history)
}

export const useGetHistoryByAccount = (account: string) => {
    const bets = useGetHistory()
    return bets ? bets[account] : []
}

export const useGetLedgerByRoundId = (account: string, roundId: string) => {
    const ledgers = useSelector((state: State) => state.predictions.ledgers)

    if (!ledgers[account]) {
        return null
    }

    if (!ledgers[account][roundId]) {
        return null
    }

    return ledgers[account][roundId]
}

export const useGetLastOraclePrice = () => {
    const lastOraclePrice = useSelector((state: State) => state.predictions.lastOraclePrice)
    return useMemo(() => {
        return ethers.BigNumber.from(lastOraclePrice)
    }, [lastOraclePrice])
}

