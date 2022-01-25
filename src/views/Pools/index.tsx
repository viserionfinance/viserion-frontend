import React, {useMemo, useRef} from 'react'

import styled from 'styled-components'
import {useWeb3React} from '@web3-react/core'
import {Flex, Heading} from 'uikit'
import partition from 'lodash/partition'
import {useTranslation} from 'contexts/Localization'
import {usePools} from 'state/pools/hooks'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import Loading from 'components/Loading'
import PoolCard from './components/PoolCard'
import CountDown from "../Farms/components/CountDown";

const CardLayout = styled(FlexLayout)`
  justify-content: center;
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

const Pools: React.FC = () => {
    const {t} = useTranslation()
    const {account} = useWeb3React()
    const {pools: poolsWithoutAutoVault} = usePools(account)
    const loadMoreRef = useRef<HTMLDivElement>(null)


    const pools = useMemo(() => {
        const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
        const cakeAutoVault = {...cakePool, isAutoVault: true}
        return [cakeAutoVault, ...poolsWithoutAutoVault]
    }, [poolsWithoutAutoVault])

    const [, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])


    const cardLayout = (
        <CardLayout>
            <PoolCard key={openPools[0].sousId} pool={openPools[0]}/>
        </CardLayout>
    )

    return (
        <>
            {
                Date.now() < 1637053200000 ?
                    <>
                        <CountDownFarm>
                            <CountDown/>
                        </CountDownFarm>
                        <CountDownContainer className="mmmm">
                            <PageHeader>
                                <Heading as="h1" scale="xxl" color="secondary" mb="24px">
                                    {t('VeFI’s Treasure')}
                                </Heading>
                                <Heading scale="md" color="text">
                                    {t('VeFI’s optimized yield earning strategies ensure you get some of the best competitive profit on your crypto assets in Metis Andromeda!')}
                                </Heading>
                            </PageHeader>
                            <Page>
                                {openPools.length === 0 && (
                                    <Flex justifyContent="center" mb="4px">
                                        <Loading/>
                                    </Flex>
                                )}
                                {cardLayout}
                                <div ref={loadMoreRef}/>
                            </Page>
                        </CountDownContainer>
                    </> :
                    <>
                        <PageHeader>
                            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
                                {t('VeFI’s Treasure')}
                            </Heading>
                            <Heading scale="md" color="text">
                                {t('VeFI’s optimized yield earning strategies ensure you get some of the best competitive profit on your crypto assets in Metis Andromeda!')}
                            </Heading>
                        </PageHeader>
                        <Page>
                            {openPools.length === 0 && (
                                <Flex justifyContent="center" mb="4px">
                                    <Loading/>
                                </Flex>
                            )}
                            {cardLayout}
                            <div ref={loadMoreRef}/>
                        </Page>
                    </>
            }
        </>
    )
}

export default Pools
