import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import {Button, Card, CardBody, Heading} from 'uikit'
import {harvestFarm} from 'utils/calls'
import {useWeb3React} from '@web3-react/core'
import {useTranslation} from 'contexts/Localization'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'
import {useMasterchef} from 'hooks/useContract'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  min-height: 376px;
  .card-body{
    background-image: url('/images/card-bg.svg');
    background-size: 32%;
    background-repeat: no-repeat;
    background-position: top right;
    background-origin: content-box;
    @media (max-width:567px){
      background-size: 20%;
    }
  }
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({theme}) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
    const [pendingTx, setPendingTx] = useState(false)
    const {account} = useWeb3React()
    const {t} = useTranslation()
    const {toastSuccess, toastError} = useToast()
    const farmsWithBalance = useFarmsWithBalance()
    const masterChefContract = useMasterchef()
    const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.gt(0))

    const harvestAllFarms = useCallback(async () => {
        setPendingTx(true)
        // eslint-disable-next-line no-restricted-syntax
        for (const farmWithBalance of balancesWithValue) {
            try {
                // eslint-disable-next-line no-await-in-loop
                await harvestFarm(masterChefContract, farmWithBalance.pid, 0)
                toastSuccess(
                    `${t('Harvested')}!`,
                    t('Your %symbol% earnings have been sent to your wallet!', {symbol: 'VeFI'}),
                )
            } catch (error) {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            }
        }
        setPendingTx(false)
    }, [balancesWithValue, masterChefContract, toastSuccess, toastError, t])

    return (
        <StyledFarmStakingCard>
            <CardBody className="card-body">
                <Heading scale="xl" mb="24px" color='primary'>
                    {t('Farms & Staking')}
                </Heading>
                <CardImage src="/logo.png" alt="cake logo" width={64} height={64}/>
                <Block>
                    <Label>{t('VeFI to Harvest')}:</Label>
                    <CakeHarvestBalance farmsWithBalance={balancesWithValue}/>
                </Block>
                <Block>
                    <Label>{t('VeFI in Wallet')}:</Label>
                    <CakeWalletBalance/>
                </Block>
                <Actions>
                    {account ? (
                        <Button
                            id="harvest-all"
                            disabled={balancesWithValue.length <= 0 || pendingTx}
                            onClick={harvestAllFarms}
                            width="100%"
                            className="bg-img"
                        >
                            {pendingTx
                                ? t('Collecting VeFI')
                                : t('Harvest all (%count%)', {
                                    count: balancesWithValue.length,
                                })}
                        </Button>
                    ) : (
                        <UnlockButton width="100%"/>
                    )}
                </Actions>
            </CardBody>
        </StyledFarmStakingCard>
    )
}

export default FarmedStakingCard
