import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'contexts/Localization'
import {Button, Flex, MetamaskIcon, Skeleton, Text, useTooltip,} from 'uikit'
import {useBlock} from 'state/block/hooks'
import {Pool} from 'state/types'
import {getAddress} from 'utils/addressHelpers'
import {registerToken} from 'utils/wallet'
import Balance from 'components/Balance'
import {useCakeBusdPrice} from "../../../../../hooks/useBUSDPrice";

interface ExpandedFooterProps {
    pool: Pool
    account: string
    userData: any
}

const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`

const ExpandedFooter: React.FC<any> = ({pool, userData, poolData}) => {
    const {t} = useTranslation()
    const {currentBlock} = useBlock()

    const {
        stakingToken,
        earningToken,
        totalStaked,
        startBlock,
        endBlock,
        stakingLimit,
        contractAddress,
        sousId,
        isAutoVault,
    } = pool

    const tokenAddress = earningToken.address ? getAddress(earningToken.address) : ''

    const isMetaMaskInScope = !!window.ethereum?.isMetaMask

    const {
        targetRef: totalStakedTargetRef,
        tooltip: totalStakedTooltip,
        tooltipVisible: totalStakedTooltipVisible,
    } = useTooltip(t('Total amount of %symbol% staked in this pool', {symbol: stakingToken.symbol}), {
        placement: 'bottom',
    })

    const cakePrice = useCakeBusdPrice()

    return (
        <ExpandedWrapper flexDirection="column">
            <Flex mb="2px" justifyContent="space-between" alignItems="center">
                <Text small>{t('Total your staked')}:</Text>
                <Flex alignItems="flex-start">
                    {userData && userData.amount > 0 ? (
                        <>
                            <Balance
                                small
                                value={userData.amount}
                                decimals={3}
                                unit={` ${stakingToken.symbol}`}
                            />
                            <span ref={totalStakedTargetRef}>
              </span>
                        </>
                    ) : (
                        <Skeleton width="90px" height="21px"/>
                    )}
                    {totalStakedTooltipVisible && totalStakedTooltip}
                </Flex>
            </Flex>
            <Flex mb="2px" justifyContent="space-between" alignItems="center">
                <Text small>{t('Total VeFI Deposited')}:</Text>
                <Flex alignItems="flex-start">
                    {poolData.poolInfo && poolData.poolInfo.currentDepositAmount > 0 ? (
                        <>
                            <Balance
                                small
                                value={poolData.poolInfo.currentDepositAmount/1e18}
                                decimals={3}
                                unit={` ${stakingToken.symbol}`}
                            />
                            <span ref={totalStakedTargetRef}/>
                        </>
                    ) : (
                        <Skeleton width="90px" height="21px"/>
                    )}
                </Flex>
            </Flex>
            <Flex mb="2px" justifyContent="space-between" alignItems="center">
                <Text small>{t('Total Liquidity')}:</Text>
                <Flex alignItems="flex-start">
                    {cakePrice > 0 && poolData.poolInfo && poolData.poolInfo.currentDepositAmount > 0 ? (
                        <>
                            $<Balance
                                small
                                value={poolData.poolInfo.currentDepositAmount/1e18 * cakePrice}
                                decimals={3}
                                unit={` `}
                            />
                            <span ref={totalStakedTargetRef}/>
                        </>
                    ) : (
                        <Skeleton width="90px" height="21px"/>
                    )}
                </Flex>
            </Flex>
            {userData && isMetaMaskInScope && tokenAddress && (
                <Flex justifyContent="flex-end">
                    <Button
                        variant="text"
                        p="0"
                        height="auto"
                        onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals)}
                    >
                        <Text color="primary" fontSize="14px">
                            {t('Add to Metamask')}
                        </Text>
                        <MetamaskIcon ml="4px"/>
                    </Button>
                </Flex>
            )}
        </ExpandedWrapper>
    )
}

export default React.memo(ExpandedFooter)
