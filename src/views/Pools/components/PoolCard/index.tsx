import BigNumber from 'bignumber.js'
import React, {useEffect, useState} from 'react'
import {CardBody, CardRibbon, Flex, Text} from 'uikit'
import UnlockButton from 'components/UnlockButton'
import {useTranslation} from 'contexts/Localization'
import {BIG_ZERO} from 'utils/bigNumber'
import {Pool} from 'state/types'
import AprRow from './AprRow'
import {StyledCard, StyledCardInner} from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'
import {useWeb3React} from "@web3-react/core";
import {usePoolStake} from "../../../../hooks/usePoolStake";

const PoolCard: React.FC<{ pool: Pool }> = ({pool}) => {
    const {sousId, stakingToken, earningToken, isFinished} = pool
    const {t} = useTranslation()
    const stakedBalance = BIG_ZERO
    const {account} = useWeb3React()
    const usePoolAction = usePoolStake()

    const [userData, setUserData] = useState({});
    const [poolData, setPoolData] = useState<any>({});

    useEffect(() => {
        let interval = setInterval(() => {
            usePoolAction.getData()
                .then(setPoolData)
            return ()=> clearInterval(interval)
        }, 5000)

    }, []);

    useEffect(() => {
        if (account) {
            let interval = setInterval(() => {
                usePoolAction.getUserData(account)
                    .then(setUserData)
            }, 5000)
            return () => clearInterval(interval)
        }
    }, [account])

    return (
        <StyledCard
            isFinished={isFinished && sousId !== 0}
            ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')}/>}
        >
            <StyledCardInner>
                <StyledCardHeader
                    isStaking={false}
                    earningToken={earningToken}
                    stakingToken={stakingToken}
                    isFinished={isFinished && sousId !== 0}
                />
                <CardBody>
                    <AprRow pool={pool} poolData={poolData}/>
                    <Flex mt="24px" flexDirection="column">
                        {account ? (
                            <CardActions pool={pool} stakedBalance={stakedBalance} userData={userData}/>
                        ) : (
                            <>
                                <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                                    {t('Start earning')}
                                </Text>
                                <UnlockButton/>
                            </>
                        )}
                    </Flex>
                </CardBody>
                <CardFooter pool={pool} userData={userData} poolData={poolData}/>
            </StyledCardInner>
        </StyledCard>
    )
}

export default PoolCard
