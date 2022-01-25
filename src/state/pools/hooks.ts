import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch} from 'state'
import {simpleRpcProvider} from 'utils/providers'
import useRefresh from 'hooks/useRefresh'
import {fetchPoolsPublicDataAsync, fetchPoolsStakingLimitsAsync, fetchPoolsUserDataAsync,} from '.'
import {Pool, State} from '../types'
import {transformPool} from './helpers'

export const useFetchPublicPoolsData = () => {
    const dispatch = useAppDispatch()
    const {slowRefresh} = useRefresh()

    useEffect(() => {
        const fetchPoolsPublicData = async () => {
            const blockNumber = await simpleRpcProvider.getBlockNumber()
            dispatch(fetchPoolsPublicDataAsync(blockNumber))
        }

        fetchPoolsPublicData()
        dispatch(fetchPoolsStakingLimitsAsync())
    }, [dispatch, slowRefresh])
}

export const usePools = (account): { pools: Pool[]; userDataLoaded: boolean } => {
    const {fastRefresh} = useRefresh()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (account) {
            dispatch(fetchPoolsUserDataAsync(account))
        }
    }, [account, dispatch, fastRefresh])

    const {pools, userDataLoaded} = useSelector((state: State) => ({
        pools: state.pools.data,
        userDataLoaded: state.pools.userDataLoaded,
    }))
    return {pools: pools.map(transformPool), userDataLoaded}
}
