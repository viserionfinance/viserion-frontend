import {useCallback} from 'react'
import {harvestFarm} from 'utils/calls'
import {useMasterchef} from 'hooks/useContract'

const useHarvestFarm = (farmPid: number) => {
    const masterChefContract = useMasterchef()

    const handleHarvest = useCallback(async () => {
        await harvestFarm(masterChefContract, farmPid, 0)
    }, [farmPid, masterChefContract])

    return {onReward: handleHarvest}
}

export default useHarvestFarm
