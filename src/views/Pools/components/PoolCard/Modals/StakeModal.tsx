import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {AutoRenewIcon, BalanceInput, Button, Flex, Link, Modal, Text} from 'uikit'
import {useTranslation} from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import {getBalanceNumber, getDecimalAmount, getFullDisplayBalance} from 'utils/formatBalance'
import {Pool} from 'state/types'
import {getCakeAddress} from 'utils/addressHelpers'
import PercentageButton from './PercentageButton'
import {usePoolStake} from "../../../../../hooks/usePoolStake";
import {useTokenBalance} from "hooks/useTokenBalance";
import ValueNumber from "../../../../Ido/components/ValueNumber";

interface StakeModalProps {
    isBnbPool: boolean
    pool: Pool
    stakingTokenBalance: BigNumber
    stakingTokenPrice: number
    isRemovingStake?: boolean
    onDismiss?: () => void
}

const StyledLink = styled(Link)`
  width: 100%;
`

const StakeModal: React.FC<StakeModalProps> = ({
                                                   isBnbPool,
                                                   pool,
                                                   stakingTokenBalance,
                                                   stakingTokenPrice,
                                                   isRemovingStake = false,
                                                   onDismiss,
                                               }) => {
    const {sousId, stakingToken, userData, stakingLimit, earningToken} = pool
    const {t} = useTranslation()
    const {theme} = useTheme()
    const {toastSuccess, toastError} = useToast()
    const [pendingTx, setPendingTx] = useState(false)
    const [stakeAmount, setStakeAmount] = useState<any>('')
    const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false)
    const [percent, setPercent] = useState(0)
    const getCalculatedStakingLimit = () => {
        if (isRemovingStake) {
            return userData.stakedBalance
        }
        return stakingLimit.gt(0) && stakingTokenBalance.gt(stakingLimit) ? stakingLimit : stakingTokenBalance
    }
    const usePoolAction = usePoolStake()

    useEffect(() => {
        if (stakingLimit.gt(0) && !isRemovingStake) {
            const fullDecimalStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingToken.decimals)
            setHasReachedStakedLimit(fullDecimalStakeAmount.plus(userData.stakedBalance).gt(stakingLimit))
        }
    }, [stakeAmount, stakingLimit, userData, stakingToken, isRemovingStake, setHasReachedStakedLimit])

    const handleStakeInputChange = (input: string) => {
        if (input) {
            const convertedInput = getDecimalAmount(new BigNumber(input), stakingToken.decimals)
            const percentage = Math.floor(convertedInput.dividedBy(getCalculatedStakingLimit()).multipliedBy(100).toNumber())
            setPercent(Math.min(percentage, 100))
        } else {
            setPercent(0)
        }
        setStakeAmount(input)
    }

    const handleChangePercent = (sliderPercent: number) => {
        if (sliderPercent > 0) {
            // const percentageOfStakingMax = getCalculatedStakingLimit().dividedBy(100).multipliedBy(sliderPercent)
            // const amountToStake = getFullDisplayBalance(percentageOfStakingMax, stakingToken.decimals, stakingToken.decimals)
            setStakeAmount(((+tokenBalance.toNumber()/100*sliderPercent)/1e18))
        } else {
            setStakeAmount('')
        }
        setPercent(sliderPercent)
    }

    const handleConfirmClick = async () => {
        setPendingTx(true)

        if (isRemovingStake) {
            // unstaking
            try {
                await usePoolAction.withdraw(stakeAmount)
                toastSuccess(
                    `${t('Unstaked')}!`,
                    t('Your %symbol% earnings have also been harvested to your wallet!', {
                        symbol: earningToken.symbol,
                    }),
                )
                setPendingTx(false)
                onDismiss()
            } catch (e) {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setPendingTx(false)
            }
        } else {
            try {
                // staking
                await usePoolAction.deposit(stakeAmount)
                toastSuccess(
                    `${t('Staked')}!`,
                    t('Your %symbol% funds have been staked in the pool!', {
                        symbol: stakingToken.symbol,
                    }),
                )
                setPendingTx(false)
                onDismiss()
            } catch (e) {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setPendingTx(false)
            }
        }
    }

    const {balance: tokenBalance} = useTokenBalance(getCakeAddress())

    return (
        <Modal
            title={isRemovingStake ? t('Unstake') : t('Stake in Pool')}
            onDismiss={onDismiss}
            headerBackground={theme.colors.gradients.cardHeader}
        >
            {stakingLimit.gt(0) && !isRemovingStake && (
                <Text color="secondary" bold mb="24px" style={{textAlign: 'center'}} fontSize="16px">
                    {t('Max stake for this pool: %amount% %token%', {
                        amount: getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0),
                        token: stakingToken.symbol,
                    })}
                </Text>
            )}
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Text bold>{isRemovingStake ? t('Unstake') : t('Stake')}:</Text>
                <Flex alignItems="center" minWidth="70px">
                    <Text ml="4px" bold>
                        {stakingToken.symbol}
                    </Text>
                </Flex>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Text bold>Balance</Text>
                <Flex alignItems="center" minWidth="70px">
                    <Text ml="4px" bold>
                        <ValueNumber value={getBalanceNumber(tokenBalance, 18)}/> VeFI
                    </Text>
                </Flex>
            </Flex>
            <BalanceInput
                value={stakeAmount}
                onUserInput={handleStakeInputChange}
                isWarning={hasReachedStakeLimit}
                decimals={stakingToken.decimals}
            />
            <Flex alignItems="center" justifyContent="space-between" mt="8px">
                <PercentageButton onClick={() => handleChangePercent(25)}>25%</PercentageButton>
                <PercentageButton onClick={() => handleChangePercent(50)}>50%</PercentageButton>
                <PercentageButton onClick={() => handleChangePercent(75)}>75%</PercentageButton>
                <PercentageButton onClick={() => handleChangePercent(100)}>{t('Max')}</PercentageButton>
            </Flex>
            <Button
                isLoading={pendingTx}
                endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor"/> : null}
                onClick={handleConfirmClick}
                disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || hasReachedStakeLimit}
                mt="24px"
            >
                {pendingTx ? t('Confirming') : t('Confirm')}
            </Button>
            {!isRemovingStake && (
                <StyledLink external href="/swap">
                    <Button width="100%" mt="8px" variant="secondary">
                        {t('Get %symbol%', {symbol: stakingToken.symbol})}
                    </Button>
                </StyledLink>
            )}
        </Modal>
    )
}

export default StakeModal
