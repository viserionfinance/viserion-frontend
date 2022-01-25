import React from 'react'
import {Button, Flex, Heading, Skeleton, Text, useModal} from 'uikit'
import BigNumber from 'bignumber.js'
import {Token} from 'config/constants/types'
import {useTranslation} from 'contexts/Localization'
import {formatNumber, getBalanceNumber, getFullDisplayBalance} from 'utils/formatBalance'
import Balance from 'components/Balance'
import CollectModal from '../Modals/CollectModal'

interface HarvestActionsProps {
    earnings: BigNumber
    earningToken: Token
    sousId: number
    earningTokenPrice: number
    isBnbPool: boolean
    isLoading?: boolean,
    userData: any
}

const HarvestActions: React.FC<HarvestActionsProps> = ({
                                                           earnings,
                                                           earningToken,
                                                           sousId,
                                                           isBnbPool,
                                                           earningTokenPrice,
                                                           isLoading = false,
                                                           userData
                                                       }) => {
    const {t} = useTranslation()
    const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
    const formattedBalance = formatNumber(earningTokenBalance, 3, 3)

    const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)

    const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
    const isCompoundPool = sousId === 0

    const [onPresentCollect] = useModal(
        <CollectModal
            formattedBalance={formattedBalance}
            fullBalance={fullBalance}
            earningToken={earningToken}
            earningsDollarValue={earningTokenDollarBalance}
            sousId={sousId}
            isBnbPool={isBnbPool}
            isCompoundPool={isCompoundPool}
            userData={userData}
        />,
    )
    return (
        <Flex justifyContent="space-between" alignItems="center" mb="16px">
            <Flex flexDirection="column">
                {isLoading ? (
                    <Skeleton width="80px" height="48px"/>
                ) : (
                    <>
                        {userData && userData.pendingRewards > 0 ? (
                            <>
                                <Balance bold fontSize="20px" decimals={4} value={userData.pendingRewards}/>
                                {userData.pendingRewards > 0 && (
                                    <Balance
                                        display="inline"
                                        fontSize="12px"
                                        color="textSubtle"
                                        decimals={4}
                                        prefix="~"
                                        value={userData.pendingRewards}
                                        unit=" USD"
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <Heading color="textDisabled">0</Heading>
                                <Text fontSize="12px" color="textDisabled">
                                    0 USD
                                </Text>
                            </>
                        )}
                    </>
                )}
            </Flex>
            <Button onClick={onPresentCollect} className="bg-img">
                {isCompoundPool ? t('Collect') : t('Harvest')}
            </Button>
        </Flex>
    )
}

export default HarvestActions
