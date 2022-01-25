import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Route, useLocation, useRouteMatch} from 'react-router-dom'
import BigNumber from 'bignumber.js'
import {useWeb3React} from '@web3-react/core'
import {Flex, Heading, Image, RowType, Text} from 'uikit'
import {ChainId} from 'config/chainId'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import {useFarms, usePollFarmsData, usePriceCakeBusd} from 'state/farms/hooks'
import usePersistState from 'hooks/usePersistState'
import {Farm} from 'state/types'
import {useTranslation} from 'contexts/Localization'
import {getBalanceNumber} from 'utils/formatBalance'
import {getFarmApr} from 'utils/apr'
import {orderBy} from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import {latinise} from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import Loading from 'components/Loading'
import FarmCard, {FarmWithStakedValue} from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import {RowProps} from './components/FarmTable/Row'
import {DesktopColumnSchema, ViewMode} from './components/types'
import CountDown from "./components/CountDown";

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;

  ${({theme}) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({theme}) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const CountDownContainer = styled.div`
  position: relative;
  background-color: #060606b8;
  filter: blur(15px);
  -webkit-filter: blur(15px);
  z-index: 0;
`
const CountDownFarm = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  backdrop-filter: blur(2px) sepia(50%);

  .count-down-farm {
    height: 100%;
    display: flex;
    align-content: center;
    padding-top: 250px;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 2rem;
      text-align: center;
      color: #000000;
      text-shadow: 0 0 2px rgba(238, 238, 238, 0.65);
      margin-bottom: 20px;
    }

    .text-light {
      font-size: 3.5rem;
      color: #ff0808;
      font-weight: bold;
      text-shadow: 0 0 3px #000000a6;
      text-align: center;
    }
  }
`

const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
    if (cakeRewardsApr && lpRewardsApr) {
        return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', {maximumFractionDigits: 2})
    }
    if (cakeRewardsApr) {
        return cakeRewardsApr.toLocaleString('en-US', {maximumFractionDigits: 2})
    }
    return null
}

const Farms: React.FC = () => {
    const {path} = useRouteMatch()
    const {pathname} = useLocation()
    const {t} = useTranslation()
    const {data: farmsLP, userDataLoaded} = useFarms()
    const cakePrice = usePriceCakeBusd()
    const [query, setQuery] = useState('')
    const [viewMode, setViewMode] = usePersistState(ViewMode.CARD, {localStorageKey: 'pancake_farm_view'})
    const {account} = useWeb3React()
    const [sortOption, setSortOption] = useState('hot')
    const chosenFarmsLength = useRef(0)

    const isArchived = pathname.includes('archived')
    const isInactive = pathname.includes('history')
    const isActive = !isInactive && !isArchived

    usePollFarmsData(isArchived)

    // Users with no wallet connected should see 0 as Earned amount
    // Connected users should see loading indicator until first userData has loaded
    const userDataReady = !account || (!!account && userDataLoaded)

    const [stakedOnly, setStakedOnly] = useState(!isActive)
    useEffect(() => {
        setStakedOnly(!isActive)
    }, [isActive])

    const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
    const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X' && !isArchivedPid(farm.pid)
    )
    // const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X' && !isArchivedPid(farm.pid) && farm.pid !==  2 && farm.pid !== 1)
    // const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X' && !isArchivedPid(farm.pid) && farm.pid !==  2 && farm.pid !== 1)
    const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid) && farm.pid !== (0 || 2))

    const stakedOnlyFarms = activeFarms.filter(
        (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
    )

    const stakedInactiveFarms = inactiveFarms.filter(
        (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
    )

    const stakedArchivedFarms = archivedFarms.filter(
        (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
    )

    const farmsList = useCallback(
        (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
            let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
                if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
                    return farm
                }
                const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
                // const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(100000000)
                const {cakeRewardsApr, lpRewardsApr} = isActive
                    ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])
                    : {cakeRewardsApr: 0, lpRewardsApr: 0}

                return {...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity}
            })

            if (query) {
                const lowercaseQuery = latinise(query.toLowerCase())
                farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
                    return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
                })
            }
            return farmsToDisplayWithAPR
        },
        [cakePrice, query, isActive],
    )

    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const loadMoreRef = useRef<HTMLDivElement>(null)

    const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
    const [observerIsSet, setObserverIsSet] = useState(false)

    const chosenFarmsMemoized = useMemo(() => {
        let chosenFarms = []

        const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
            switch (sortOption) {
                case 'apr':
                    return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
                case 'multiplier':
                    return orderBy(
                        farms,
                        (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
                        'desc',
                    )
                case 'earned':
                    return orderBy(
                        farms,
                        (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
                        'desc',
                    )
                case 'liquidity':
                    return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
                default:
                    return farms
            }
        }

        if (isActive) {
            chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
        }
        if (isInactive) {
            chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
        }
        if (isArchived) {
            chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
        }

        return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
    }, [
        sortOption,
        activeFarms,
        farmsList,
        inactiveFarms,
        archivedFarms,
        isActive,
        isInactive,
        isArchived,
        stakedArchivedFarms,
        stakedInactiveFarms,
        stakedOnly,
        stakedOnlyFarms,
        numberOfFarmsVisible,
    ])

    chosenFarmsLength.current = chosenFarmsMemoized.length

    useEffect(() => {
        const showMoreFarms = (entries) => {
            const [entry] = entries
            if (entry.isIntersecting) {
                setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
                    if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
                        return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
                    }
                    return farmsCurrentlyVisible
                })
            }
        }

        if (!observerIsSet) {
            const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
                rootMargin: '0px',
                threshold: 1,
            })
            loadMoreObserver.observe(loadMoreRef.current)
            setObserverIsSet(true)
        }
    }, [chosenFarmsMemoized, observerIsSet])

    const rowData = chosenFarmsMemoized.map((farm) => {
        const {token, quoteToken} = farm
        const tokenAddress = token.address
        const quoteTokenAddress = quoteToken.address
        const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('VeFI', '')

        const row: RowProps = {
            apr: {
                value: getDisplayApr(farm.apr, farm.lpRewardsApr),
                multiplier: farm.multiplier,
                lpLabel,
                tokenAddress,
                quoteTokenAddress,
                cakePrice,
                originalValue: farm.apr,
            },
            farm: {
                label: lpLabel,
                pid: farm.pid,
                token: farm.token,
                quoteToken: farm.quoteToken,
            },
            earned: {
                earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
                pid: farm.pid,
            },
            liquidity: {
                liquidity: farm.liquidity,
            },
            multiplier: {
                multiplier: farm.multiplier,
            },
            details: farm,
        }

        return row
    })

    const renderContent = (): JSX.Element => {
        if (viewMode === ViewMode.TABLE && rowData.length) {
            const columnSchema = DesktopColumnSchema

            const columns = columnSchema.map((column) => ({
                id: column.id,
                name: column.name,
                label: column.label,
                sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
                    switch (column.name) {
                        case 'farm':
                            return b.id - a.id
                        case 'apr':
                            if (a.original.apr.value && b.original.apr.value) {
                                return Number(a.original.apr.value) - Number(b.original.apr.value)
                            }

                            return 0
                        case 'earned':
                            return a.original.earned.earnings - b.original.earned.earnings
                        default:
                            return 1
                    }
                },
                sortable: column.sortable,
            }))

            return <Table data={rowData} columns={columns} userDataReady={userDataReady}/>
        }

        return (
            <div>
                <FlexLayout>
                    <Route exact path={`${path}`}>
                        {chosenFarmsMemoized.map((farm) => (
                            <FarmCard
                                key={farm.pid}
                                farm={farm}
                                displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                                cakePrice={cakePrice}
                                account={account}
                                removed={false}
                            />
                        ))}
                    </Route>
                    <Route exact path={`${path}/history`}>
                        {chosenFarmsMemoized.map((farm) => (
                            <FarmCard
                                key={farm.pid}
                                farm={farm}
                                displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                                cakePrice={cakePrice}
                                account={account}
                                removed
                            />
                        ))}
                    </Route>
                    <Route exact path={`${path}/archived`}>
                        {chosenFarmsMemoized.map((farm) => (
                            <FarmCard
                                key={farm.pid}
                                farm={farm}
                                displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                                cakePrice={cakePrice}
                                account={account}
                                removed
                            />
                        ))}
                    </Route>
                </FlexLayout>
            </div>
        )
    }

    return (
        <>
            {
                Date.now() > 1636880400000 ? <>

                        <PageHeader>
                            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
                                {t('VeFI Hybrid Farm')}
                            </Heading>
                            <Heading scale="md" color="text">
                                {t('Earn $VeFI while staking your favorite token or liquidity pair.')}
                                <br/>
                                {t('Optimized yield farm strategies ensure you get some of the best competitive profit on your crypto assets in Metis Andromeda!')}
                            </Heading>
                        </PageHeader>
                        <Page>

                            {renderContent()}
                            {account && !userDataLoaded && stakedOnly && (
                                <Flex justifyContent="center">
                                    <Loading/>
                                </Flex>
                            )}
                            <div ref={loadMoreRef}/>
                        </Page>
                    </>
                    :
                    <>
                        <CountDownFarm>
                            <CountDown/>
                        </CountDownFarm>
                        <CountDownContainer className="mmmm">
                            <PageHeader>
                                <Heading as="h1" scale="xxl" color="secondary" mb="24px">
                                    {t('VeFI Hybrid Farm')}
                                </Heading>
                                <Heading scale="md" color="text">
                                    {t('Earn $VeFI while staking your favorite token or liquidity pair.')}
                                    <br/>
                                    {t('Optimized yield farm strategies ensure you get some of the best competitive profit on your crypto assets in Metis Andromeda!')}
                                </Heading>
                            </PageHeader>
                            <Page>
                                {renderContent()}
                                {account && !userDataLoaded && stakedOnly && (
                                    <Flex justifyContent="center">
                                        <Loading/>
                                    </Flex>
                                )}
                                <div ref={loadMoreRef}/>
                            </Page>
                        </CountDownContainer>
                    </>
            }

        </>
    )
}

export default Farms
