import {useTranslation} from 'contexts/Localization'
import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {ArrowForwardIcon, Card, CardBody, Flex, Heading} from 'uikit'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({theme}) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({scale: 'xl'})`
  line-height: 44px;
`
const StakeCard = () => {

    const {t} = useTranslation()


    return (
        <StyledFarmStakingCard>
            <NavLink exact activeClassName="active" to="/" id="farm-apr-cta">
                <CardBody>
                    <Heading color="contrast" scale="lg">
                        {t('Stake')}
                    </Heading>
                    <CardMidContent color="#000000">
                        {/* {highestApr && !isFetchingFarmData ? (
              `${highestApr}%`
            ) : (
              <>
                <Skeleton animation="pulse" variant="rect" height="44px" />
                <div ref={observerRef} />
              </>
            )} */}
                        METIS, VeFI, USDT
                    </CardMidContent>
                    <Flex justifyContent="space-between">
                        <Heading color="contrast" scale="lg">
                            In Pools
                        </Heading>
                        <ArrowForwardIcon mt={30} color="primary"/>
                    </Flex>
                </CardBody>
            </NavLink>
        </StyledFarmStakingCard>
    )
}

export default StakeCard
