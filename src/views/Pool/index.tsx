import React, {useMemo} from 'react'
import styled from 'styled-components'
import {Pair} from 'sdk'
import {AddIcon, Button, CardBody, CardFooter, Flex, Heading, Text} from 'uikit'
import {Link} from 'react-router-dom'
import {useTranslation} from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from '../../components/PositionCard'
import {useTokenBalancesWithLoadingIndicator} from '../../state/wallet/hooks'
import {usePairs} from '../../hooks/usePairs'
import {toV2LiquidityToken, useTrackedTokenPairs} from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import {AppBody, AppHeader} from '../../components/App'
import Page from '../Page'

const Body = styled(CardBody)`
  background-color: ${({theme}) => theme.colors.dropdownDeep};
`
const Hero = styled.div`
  align-items: center;
  // background-image: url('/images/pan-bg-mobile.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;
  ${({theme}) => theme.mediaQueries.lg} {
    // background-image: url('/images/pan-bg2.svg'), url('/images/pan-bg.svg');
    // background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

export default function Pool() {
    const {account} = useActiveWeb3React()
    const {t} = useTranslation()

    // fetch the user's balances of all tracked V2 LP tokens
    const trackedTokenPairs = useTrackedTokenPairs()
    const tokenPairsWithLiquidityTokens = useMemo(
        () => trackedTokenPairs.map((tokens) => ({liquidityToken: toV2LiquidityToken(tokens), tokens})),
        [trackedTokenPairs],
    )
    const liquidityTokens = useMemo(
        () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
        [tokenPairsWithLiquidityTokens],
    )
    const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
        account ?? undefined,
        liquidityTokens,
    )

    // fetch the reserves for all V2 pools in which the user has a balance
    const liquidityTokensWithBalances = useMemo(
        () =>
            tokenPairsWithLiquidityTokens.filter(({liquidityToken}) =>
                v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
            ),
        [tokenPairsWithLiquidityTokens, v2PairsBalances],
    )

    const v2Pairs = usePairs(liquidityTokensWithBalances.map(({tokens}) => tokens))
    const v2IsLoading =
        fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

    const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

    const renderBody = () => {
        if (!account) {
            return (
                <Text color="textSubtle" textAlign="center">
                    {t('Connect to a wallet to view your liquidity.')}
                </Text>
            )
        }
        if (v2IsLoading) {
            return (
                <Text color="textSubtle" textAlign="center">
                    <Dots>Loading</Dots>
                </Text>
            )
        }
        if (allV2PairsWithLiquidity?.length > 0) {
            return allV2PairsWithLiquidity.map((v2Pair, index) => (
                <FullPositionCard
                    key={v2Pair.liquidityToken.address}
                    pair={v2Pair}
                    mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
                />
            ))
        }
        return (
            <Text color="textSubtle" textAlign="center">
                {t('No liquidity found.')}
            </Text>
        )
    }

    return (
        <Page>
            <Hero>
                <Heading as="h1" scale="xl" mb="24px" color="secondary">
                    {t('VeFI Swap')}
                </Heading>
                <Text>
                    The first Cross-Chains Swap in Metis Andromeda with Metis Andromeda, Polygon, Ethereum.
                    <br/>
                    The VeFI Swap is an cross-chains automated market maker (“AMM”) that allows any combination of two
                    tokens to
                    be exchanged on the Metis Andromeda, Metis Andromeda, Polygon, Ethereum.
                </Text>
            </Hero>
            <AppBody>
                <AppHeader title="Your Liquidity" subtitle="Remove liquidity to receive tokens back"/>
                <Body>
                    {renderBody()}
                    {account && !v2IsLoading && (
                        <Flex flexDirection="column" alignItems="center" mt="24px">
                            <Text color="textSubtle" mb="8px">
                                {t("Don't see a pool you joined?")}
                            </Text>
                            <Button id="import-pool-link" variant="secondary" scale="sm" as={Link} to="/find">
                                {t('Find other LP tokens')}
                            </Button>
                        </Flex>
                    )}
                </Body>
                <CardFooter style={{textAlign: 'center'}}>
                    <Button id="join-pool-button" as={Link} to="/add" width="100%" startIcon={<AddIcon color="white"/>}
                            className="bg-img">
                        {t('Add Liquidity')}
                    </Button>
                </CardFooter>
            </AppBody>
        </Page>
    )
}
