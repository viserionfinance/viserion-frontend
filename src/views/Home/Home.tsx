import Page from 'components/Layout/Page'
import {useTranslation} from 'contexts/Localization'
import React from 'react'
import styled from 'styled-components'
import {BaseLayout, Heading} from 'uikit'
import CakeStats from 'views/Home/components/CakeStats'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import TwitterCard from './components/TwitterCard'
import useToast from "../../hooks/useToast";

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

  .contract {
    margin-bottom: 30px;
    word-wrap: anywhere;

    a {
      color: #e85b24;
    }
  }

  ${({theme}) => theme.mediaQueries.lg} {
    // background-image: url('/images/pan-bg2.svg'), url('/images/pan-bg.svg');
    // background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({theme}) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({theme}) => theme.mediaQueries.lg} {
    margin-bottom: 32px;
    grid-gap: 32px;

    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
    const {t} = useTranslation()
    // const { currentLotteryPrize } = useFetchLotteryForPromos()
    const {toastSuccess} = useToast()
    return (
        <>
            <Page>
                <Hero>
                    {/*<div className="contract">*/}
                    {/*    Viserion Contract:*/}
                    {/*    <a href=""*/}
                    {/*       target="_blank"*/}
                    {/*    >*/}
                    {/*        Comingsoon*/}
                    {/*    </a>*/}
                    {/*    <CopyToClipboard*/}
                    {/*        text=""*/}
                    {/*        onCopy={() => toastSuccess("Copy address success !!")}*/}
                    {/*    >*/}
                    {/*        <CopyOutlined/>*/}
                    {/*    </CopyToClipboard>*/}
                    {/*</div>*/}
                    <Heading as="h1" scale="xl" mb="24px" color="secondary">
                        <img src="../../logo-full.png" className="logo-header"/>
                    </Heading>
                    <Heading scale="md" color="text">
                        {t(`A decentralized hybrid yield earning with value-optimized, economically sustainable running on the Metis Andromeda blockchain.`)}
                    </Heading>
                </Hero>
                <div>
                    <Cards>
                        <FarmStakingCard/>
                        <TwitterCard/>
                    </Cards>
                    {/*<Cards>*/}
                    <CakeStats/>
                    {/*<TotalValueLockedCard/>*/}
                    {/*</Cards>*/}
                </div>
            </Page>
        </>
    )
}

export default Home
