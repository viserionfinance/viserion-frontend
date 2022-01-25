import React, {useEffect, useMemo, useState} from 'react'
import {ArrowForwardIcon, Card, CardBody, Flex, Heading, Skeleton} from 'uikit'
import styled from 'styled-components'
import {useTranslation} from 'contexts/Localization'
import {NavLink} from "react-router-dom";
import {useFarms, usePriceCakeBusd} from "../../../state/farms/hooks";
import {useAppDispatch} from "../../../state";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import {fetchFarmsPublicDataAsync, nonArchivedFarms} from "../../../state/farms";
import BigNumber from "bignumber.js";
import {getFarmApr} from "../../../utils/apr";
import {ChainId} from "../../../config/chainId";
import max from "lodash/max";
import {usePoolStake} from "../../../hooks/usePoolStake";


const StyledTwitterCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;

  iframe {
    width: 100% !important;
  }

  //     border: solid 5px #fdd35b;
  //   -webkit-box-shadow: 0px 0px 0px 5px rgba(72,27,19,1);
  //   -moz-box-shadow: 0px 0px 0px 5px rgba(72,27,19,1);
  //   box-shadow: 0px 0px 0px 5px rgba(72,27,19,1);
  //   border-radius: 15px
`

const CardMidContent = styled(Heading).attrs({scale: 'xl'})`
  line-height: 44px;
`

const TwitterCard = () => {
    const [isFetchingFarmData, setIsFetchingFarmData] = useState(true)
    const [tvlStake, setTvlStake] = useState<any>(0);
    const [totalStake, setTotalStake] = useState<any>(0);
    const {t} = useTranslation()
    const {data: farmsLP} = useFarms()
    const cakePrice = usePriceCakeBusd()
    const dispatch = useAppDispatch()
    const {observerRef, isIntersecting} = useIntersectionObserver()
    const stakeAction = usePoolStake()

    // Fetch farm data once to get the max APR
    useEffect(() => {
        const fetchFarmData = async () => {
            try {
                await dispatch(fetchFarmsPublicDataAsync(nonArchivedFarms.map((nonArchivedFarm) => nonArchivedFarm.pid)))
            } finally {
                setIsFetchingFarmData(false)
            }
        }
        if (isIntersecting) {
            fetchFarmData()
        }
    }, [dispatch, setIsFetchingFarmData, isIntersecting])

    const highestApr = useMemo(() => {
        if (cakePrice.gt(0)) {
            const aprs = farmsLP.map((farm) => {
                // Filter inactive farms, because their theoretical APR is super high. In practice, it's 0.
                if (farm.multiplier !== '0X' && farm.lpTotalInQuoteToken && farm.quoteToken.busdPrice) {
                    const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
                    const {cakeRewardsApr, lpRewardsApr} = getFarmApr(
                        new BigNumber(farm.poolWeight),
                        cakePrice,
                        totalLiquidity,
                        farm.lpAddresses[ChainId.MAINNET],
                    )
                    return cakeRewardsApr + lpRewardsApr
                }
                return null
            })
            const maxApr = max(aprs)
            return maxApr?.toLocaleString('en-US', {maximumFractionDigits: 2})
        }
        return null
    }, [cakePrice, farmsLP])

    const aprText = highestApr || '-'
    const earnAprText = t('Earn up to %highestApr% APR in Farms', {highestApr: aprText})
    const [earnUpTo, InFarms] = earnAprText.split(aprText)

    const farms = useFarms()
    const [tvl, setTvl] = useState(0);

    useEffect(() => {
        if (farms.data.length > 0) {
            let total = 0
            farms.data.map(farm => {
                total += new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice).toNumber()
            })
            setTvl(total)
        }
    }, [farms]);

    useEffect(() => {
        stakeAction.getData()
            .then(res => {
                setTotalStake((res.poolInfo.currentDepositAmount / 1e18))
            })
    }, [cakePrice]);

    useEffect(() => {
        if (totalStake > 0 && +cakePrice > 0) {
            setTvlStake(totalStake * (+cakePrice))
        }
    }, [cakePrice, totalStake]);

    return (
        <StyledTwitterCard>
            <CardBody>
                <NavLink exact activeClassName="active" to="/farms" id="farm-apr-cta">
                    <CardBody>
                        <Heading scale="lg">
                            {earnUpTo}
                        </Heading>
                        <CardMidContent>
                            {highestApr && !isFetchingFarmData ? (
                                `${highestApr}%`
                            ) : (
                                <>
                                    N/a
                                    {/*<Skeleton animation="pulse" variant="rect" height="44px"/>*/}
                                    <div ref={observerRef}/>
                                </>
                            )}
                        </CardMidContent>
                        <Flex justifyContent="space-between">
                            <Heading scale="lg">
                                {InFarms}
                            </Heading>
                            {/*<ArrowForwardIcon mt={30} color="primary"/>*/}
                        </Flex>
                    </CardBody>
                    <CardBody>
                        <Heading scale="lg" mb="24px">
                            {t('Total Value Locked (TVL)')}
                        </Heading>
                        {tvl ? (
                            <>
                                <Heading scale="xl">{`$${(tvl + tvlStake).toLocaleString("EN")}`}</Heading>
                            </>
                        ) : (
                            "N/a"
                            // <Skeleton height={66}/>
                        )}
                    </CardBody>
                </NavLink>
            </CardBody>
        </StyledTwitterCard>
    )
}

export default TwitterCard
