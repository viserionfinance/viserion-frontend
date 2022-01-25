import React from 'react'
import {AutoRenewIcon, Button, Skeleton} from 'uikit'
import {useTranslation} from 'contexts/Localization'
import {useCake, useERC20} from 'hooks/useContract'
import {getAddress} from 'utils/addressHelpers'
import {Pool} from 'state/types'
import {useApprovePool} from '../../../hooks/useApprove'
import {usePoolStake} from "../../../../../hooks/usePoolStake";

interface ApprovalActionProps {
    pool: Pool
    isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({pool, isLoading = false}) => {
    const {sousId, stakingToken, earningToken} = pool
    const {t} = useTranslation()
    const poolAction = usePoolStake()

    return (
        <>
            {isLoading ? (
                <Skeleton width="100%" height="52px"/>
            ) : (
                <Button
                    onClick={()=> poolAction.approve()}
                    width="100%"
                    className="bg-img"
                >
                    {t('Enable')}
                </Button>
            )}
        </>
    )
}

export default ApprovalAction
