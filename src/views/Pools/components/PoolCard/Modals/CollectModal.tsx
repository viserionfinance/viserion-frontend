import React, {useState} from 'react'
import {AutoRenewIcon, Button, ButtonMenu, Flex, Heading, Modal, Text, useTooltip,} from 'uikit'
import {useTranslation} from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import {Token} from 'config/constants/types'
import {usePoolStake} from "../../../../../hooks/usePoolStake";
import {useWeb3React} from "@web3-react/core";

interface CollectModalProps {
    formattedBalance: string
    fullBalance: string
    earningToken: Token
    earningsDollarValue: number
    sousId: number
    isBnbPool: boolean
    isCompoundPool?: boolean
    onDismiss?: () => void
    userData: any
}

const CollectModal: React.FC<any> = ({
                                         formattedBalance,
                                         fullBalance,
                                         earningToken,
                                         earningsDollarValue,
                                         sousId,
                                         isBnbPool,
                                         isCompoundPool = false,
                                         onDismiss,
                                         userData
                                     }) => {
    const {t} = useTranslation()
    const {theme} = useTheme()
    const {toastSuccess, toastError} = useToast()
    const [pendingTx, setPendingTx] = useState(false)
    const [shouldCompound, setShouldCompound] = useState(isCompoundPool)
    const {targetRef} = useTooltip(
        <>
            <Text mb="12px">{t('Compound: collect and restake CAKE into pool.')}</Text>
            <Text>{t('Harvest: collect CAKE and send to wallet')}</Text>
        </>,
        {placement: 'bottom-end', tooltipOffset: [20, 10]},
    )
    const usePoolAction = usePoolStake()
    const {account} = useWeb3React()
    const handleHarvestConfirm = async () => {
        setPendingTx(true)
        // compounding
        if (shouldCompound) {
            try {
                await usePoolAction.harvestFor(account)
                toastSuccess(
                    `${t('Compounded')}!`,
                    t('Your %symbol% earnings have been re-invested into the pool!', {symbol: earningToken.symbol}),
                )
                setPendingTx(false)
                onDismiss()
            } catch (e) {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                console.error(e)
                setPendingTx(false)
            }
        } else {
            // harvesting
            try {
                await usePoolAction.harvestFor(account)
                toastSuccess(
                    `${t('Harvested')}!`,
                    t('Your %symbol% earnings have been sent to your wallet!', {symbol: earningToken.symbol}),
                )
                setPendingTx(false)
                onDismiss()
            } catch (e) {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                console.error(e)
                setPendingTx(false)
            }
        }
    }

    return (
        <Modal
            title={`${earningToken.symbol} ${isCompoundPool ? t('Collect') : t('Harvest')}`}
            onDismiss={onDismiss}
            headerBackground={theme.colors.gradients.cardHeader}
        >
            {isCompoundPool && (
                <Flex justifyContent="center" alignItems="center" mb="24px">
                    <ButtonMenu
                        activeIndex={1}
                        scale="sm"
                        variant="subtle"
                        onItemClick={(index) => setShouldCompound(!index)}
                    >
                    </ButtonMenu>
                </Flex>
            )}

            <Flex justifyContent="space-between" alignItems="center" mb="24px">
                <Text>{t('Deposited')} </Text>
                <Flex flexDirection="column">
                    <Heading>
                        {userData.amount} VeFI
                    </Heading>
                </Flex>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="24px">
                <Text>{t('Reward')} </Text>
                <Flex flexDirection="column">
                    <Heading>
                        {userData.pendingRewards} {earningToken.symbol}
                    </Heading>
                </Flex>
            </Flex>

            <Button
                mt="8px"
                onClick={handleHarvestConfirm}
                className="bg-img"
                isLoading={pendingTx}
                endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor"/> : null}
            >
                {pendingTx ? t('Harvesting') : t('Harvest')}
            </Button>

            {
                userData.amount > 0 &&
                <>
                    <Button
                        mt="8px"
                        className="bg-img"
                        onClick={() => usePoolAction.withdraw(userData.amount)}
                    >
                        Withdraw
                    </Button>

                    <Button
                        mt="8px"
                        className="bg-img"
                        onClick={() => usePoolAction.emergencyWithdraw()}
                    >
                        EmergencyWithdraw
                    </Button>
                </>
            }

        </Modal>
    )
}

export default CollectModal
