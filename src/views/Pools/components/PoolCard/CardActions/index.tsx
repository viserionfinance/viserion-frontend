import BigNumber from 'bignumber.js'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {BIG_ZERO} from 'utils/bigNumber'
import {Box, Flex, Text} from 'uikit'
import {useTranslation} from 'contexts/Localization'
import {PoolCategory} from 'config/constants/types'
import {Pool} from 'state/types'
import ApprovalAction from './ApprovalAction'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'
import {useWeb3React} from "@web3-react/core";
import {usePoolStake} from "../../../../../hooks/usePoolStake";

const InlineText = styled(Text)`
  display: inline;
`

interface CardActionsProps {
    pool: Pool
    stakedBalance: BigNumber,
    userData: any
}

const CardActions: React.FC<CardActionsProps> = ({pool, stakedBalance, userData}) => {
    const {sousId, stakingToken, earningToken, harvest, poolCategory, earningTokenPrice} = pool
    // Pools using native BNB behave differently than pools using a token
    const isBnbPool = poolCategory === PoolCategory.BINANCE
    const {t} = useTranslation()
    const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO
    const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
    const isStaked = stakedBalance.gt(0)
    const isLoading = !userData

    const [isApprove, setIsApprove] = useState(false);
    const {account} = useWeb3React()
    const poolAction = usePoolStake()

    useEffect(() => {
        if(account){
            poolAction.allowance(account)
                .then(setIsApprove)
        }
    }, [account, userData]);


    return (
        <Flex flexDirection="column">
            <Flex flexDirection="column">
                {harvest && (
                    <>
                        <Box display="inline">
                            <InlineText color="secondary" textTransform="uppercase" bold fontSize="12px">
                                {`${earningToken.symbol} `}
                            </InlineText>
                            <InlineText color="textSubtle" textTransform="uppercase" bold fontSize="12px">
                                {t('Earned')}
                            </InlineText>
                        </Box>
                        <HarvestActions
                            userData={userData}
                            earnings={earnings}
                            earningToken={earningToken}
                            sousId={sousId}
                            earningTokenPrice={earningTokenPrice}
                            isBnbPool={isBnbPool}
                            isLoading={isLoading}
                        />
                    </>
                )}
                <Box display="inline">
                    <InlineText color={isStaked ? 'secondary' : 'textSubtle'} textTransform="uppercase" bold
                                fontSize="12px">
                        {isStaked ? stakingToken.symbol : t('Stake')}{' '}
                    </InlineText>
                    <InlineText color={isStaked ? 'textSubtle' : 'secondary'} textTransform="uppercase" bold
                                fontSize="12px">
                        {isStaked ? t('Staked') : `${stakingToken.symbol}`}
                    </InlineText>
                </Box>
                {!isApprove ? (
                    <ApprovalAction pool={pool} isLoading={isLoading}/>
                ) : (
                    <StakeActions
                        isLoading={isLoading}
                        pool={pool}
                        stakingTokenBalance={stakingTokenBalance}
                        stakedBalance={stakedBalance}
                        isBnbPool={isBnbPool}
                        isStaked={isStaked}
                    />
                )}
            </Flex>
        </Flex>
    )
}

export default CardActions
